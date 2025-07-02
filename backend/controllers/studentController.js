const { db } = require('../config/firebase');
const { uploadCompressedImage } = require('../utils/uploadToGCS');
const collection = db.collection('students');


const isValidNIC = (nic) => {
  const nic12 = /^\d{12}$/;
  const nicOld = /^\d{9}[vV]$/;
  return nic12.test(nic) || nicOld.test(nic);
};

// Helper to auto-create parent if not exists
const tryCreateParent = async (nic, email, name) => {
  if (!nic || !isValidNIC(nic)) return;

  const parentRef = db.collection('parents');
  const existing = await parentRef.where('nic', '==', nic).limit(1).get();

  if (existing.empty) {
    await parentRef.add({
      nic,
      password: nic, // default password
      email: email || null,
      name: name || 'Unknown',
    });
  }
};

exports.createStudent = async (req, res) => {
  try {
    // Parse data: if multipart/form-data, JSON is inside req.body.data
    const body = req.body.data ? JSON.parse(req.body.data) : req.body;

    const {
      registrationNo,
      registrationDate,
      registrationFee,
      monthlyFee,
      preBudget,
      totalAmount,
      nameFull,
      nameInitials,
      dob,
      religion,
      nic,
      address,
      telephone,
      mother,
      father,
      previousSchool,
      subjects,
      nominee,
      medical,
    } = body;

    // NIC format validations
    if (nic && !isValidNIC(nic)) {
      return res.status(400).send({ error: 'Invalid student NIC format' });
    }
    if (mother?.nic && !isValidNIC(mother.nic)) {
      return res.status(400).send({ error: 'Invalid mother NIC format' });
    }
    if (father?.nic && !isValidNIC(father.nic)) {
      return res.status(400).send({ error: 'Invalid father NIC format' });
    }
    if (nominee?.nic && !isValidNIC(nominee.nic)) {
      return res.status(400).send({ error: 'Invalid nominee NIC format' });
    }

    // ✅ Handle profile picture upload if file is present
    const profilePictureUrl = req.file
      ? await uploadCompressedImage(req.file.buffer, req.file.originalname)
      : null;

    // ✅ Auto-create parent accounts
    await tryCreateParent(mother?.nic, mother?.email, mother?.name);
    await tryCreateParent(father?.nic, father?.email, father?.name);
    await tryCreateParent(nominee?.nic, null, nominee?.name);

    const studentData = {
      profilePictureUrl,
      registrationNo,
      registrationDate: new Date(registrationDate),
      registrationFee: Number(registrationFee),
      monthlyFee: Number(monthlyFee),
      preBudget: Number(preBudget),
      totalAmount: Number(totalAmount),
      nameFull,
      nameInitials,
      dob: new Date(dob),
      religion,
      nic,
      address,
      telephone,
      parents: { mother, father },
      previousSchool,
      subjects,
      nominee,
      medical,
    };

    const docRef = await db.collection('students').add(studentData);
    res.status(201).send({ id: docRef.id });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
};

// ✅ GET all students
exports.getAllStudents = async (req, res) => {
  try {
    const snapshot = await collection.get();
    const students = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(students);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// ✅ GET student by ID
exports.getStudentById = async (req, res) => {
  try {
    const doc = await collection.doc(req.params.id).get();
    if (!doc.exists) return res.status(404).send({ error: 'Student not found' });

    res.status(200).send({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// ✅ UPDATE student by ID
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body.data ? JSON.parse(req.body.data) : req.body;

    // Optional: validate NIC fields if being updated
    for (const field of ['nic', 'mother?.nic', 'father?.nic', 'nominee?.nic']) {
      const val = eval(`body.${field}`);
      if (val && !isValidNIC(val)) {
        return res.status(400).send({ error: `Invalid NIC format in ${field}` });
      }
    }

    // Optional: handle profile picture update
    let profilePictureUrl = null;
    if (req.file) {
      profilePictureUrl = await uploadCompressedImage(req.file.buffer, req.file.originalname);
      body.profilePictureUrl = profilePictureUrl;
    }

    await collection.doc(id).update(body);
    res.status(200).send({ id, ...body });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
};

// ✅ DELETE student by ID
exports.deleteStudent = async (req, res) => {
  try {
    await collection.doc(req.params.id).delete();
    res.status(204).send();
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
