const { db } = require('../config/firebase');
// const { uploadCompressedImage } = require('../utils/uploadToGCS');

const isValidNIC = (nic) => {
  const nic12 = /^\d{12}$/;
  const nicOld = /^\d{9}[vV]$/;
  return nic12.test(nic) || nicOld.test(nic);
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
      medical
    } = req.body;

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
      medical
    };

    const docRef = await db.collection('students').add(studentData);
    res.status(201).send({ id: docRef.id });

  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
};
