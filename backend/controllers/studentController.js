const { db } = require('../config/firebase');

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
      name: name || 'Unknown', // fallback in case name is missing
    });
  }
};


exports.createStudent = async (req, res) => {
  try {
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
    } = req.body;

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

    const profilePictureUrl = null; // placeholder for now

    // Auto-create parent accounts
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
