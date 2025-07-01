import { useState } from 'react';
import axios from 'axios';

export default function StudentRegister() {
  const [form, setForm] = useState({
    registrationNo: '',
    registrationDate: '',
    registrationFee: '',
    monthlyFee: '',
    preBudget: '',
    totalAmount: '',
    nameInitials: '',
    dob: '',
    religion: 'Buddhism',
    nic: '',
    address: '',
    telephone: '',
    mother: {
      name: '',
      occupation: '',
      workplaceAddress: '',
      mobile: '',
      nic: '',
      email: '',
    },
    father: {
      name: '',
      occupation: '',
      workplaceAddress: '',
      mobile: '',
      nic: '',
      email: '',
    },
    previousSchool: '',
    subjects: '',
    nominee: {
      name: '',
      address: '',
      mobile: '',
      nic: '',
    },
    medical: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e, section) => {
    const { name, value } = e.target;

    if (section) {
      setForm(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value
        }
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const dataToSend = {
      ...form,
      registrationFee: parseFloat(form.registrationFee),
      monthlyFee: parseFloat(form.monthlyFee),
      preBudget: parseFloat(form.preBudget),
      totalAmount: parseFloat(form.totalAmount),
      subjects: form.subjects.split(',').map(s => s.trim())
    };

    try {
      await axios.post('http://localhost:5000/api/students', dataToSend);
      setSuccess('Student registered successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <div>
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>

        {/* Basic Info */}
        <input type="text" name="registrationNo" placeholder="Registration No" value={form.registrationNo} onChange={handleChange} /><br />
        <input type="date" name="registrationDate" placeholder="Date" value={form.registrationDate} onChange={handleChange} /><br />
        <input type="number" name="registrationFee" placeholder="Registration Fee" value={form.registrationFee} onChange={handleChange} /><br />
        <input type="number" name="monthlyFee" placeholder="Monthly Fee" value={form.monthlyFee} onChange={handleChange} /><br />
        <input type="number" name="preBudget" placeholder="Pre Budget" value={form.preBudget} onChange={handleChange} /><br />
        <input type="number" name="totalAmount" placeholder="Total Amount" value={form.totalAmount} onChange={handleChange} /><br />
        <input type="text" name="nameFull" placeholder="Name in FULL (BLOCK LETTERS)" value={form.nameFull} onChange={handleChange} /><br />
        <input type="text" name="nameInitials" placeholder="Name with Initials" value={form.nameInitials} onChange={handleChange} /><br />
        <input type="date" name="dob" placeholder="Date of Birth" value={form.dob} onChange={handleChange} /><br />

        <select name="religion" value={form.religion} onChange={handleChange}>
          <option value="Buddhism">Buddhism</option>
          <option value="Catholicism">Catholicism</option>
          <option value="Islam">Islam</option>
          <option value="Hindu">Hindu</option>
        </select><br />

        <input type="text" name="nic" placeholder="NIC (optional)" value={form.nic} onChange={handleChange} /><br />
        <input type="text" name="address" placeholder="Permanent Address" value={form.address} onChange={handleChange} /><br />
        <input type="text" name="telephone" placeholder="Telephone" value={form.telephone} onChange={handleChange} /><br />

        <h3>Mother's Details</h3>
        <input type="text" name="name" placeholder="Name" value={form.mother.name} onChange={(e) => handleChange(e, 'mother')} /><br />
        <input type="text" name="occupation" placeholder="Occupation" value={form.mother.occupation} onChange={(e) => handleChange(e, 'mother')} /><br />
        <input type="text" name="workplaceAddress" placeholder="Work Address" value={form.mother.workplaceAddress} onChange={(e) => handleChange(e, 'mother')} /><br />
        <input type="text" name="mobile" placeholder="Mobile Number" value={form.mother.mobile} onChange={(e) => handleChange(e, 'mother')} /><br />
        <input type="text" name="nic" placeholder="NIC" value={form.mother.nic} onChange={(e) => handleChange(e, 'mother')} /><br />
        <input type="email" name="email" placeholder="Email (optional)" value={form.mother.email} onChange={(e) => handleChange(e, 'mother')} /><br />

        <h3>Father's Details</h3>
        <input type="text" name="name" placeholder="Name" value={form.father.name} onChange={(e) => handleChange(e, 'father')} /><br />
        <input type="text" name="occupation" placeholder="Occupation" value={form.father.occupation} onChange={(e) => handleChange(e, 'father')} /><br />
        <input type="text" name="workplaceAddress" placeholder="Work Address" value={form.father.workplaceAddress} onChange={(e) => handleChange(e, 'father')} /><br />
        <input type="text" name="mobile" placeholder="Mobile Number" value={form.father.mobile} onChange={(e) => handleChange(e, 'father')} /><br />
        <input type="text" name="nic" placeholder="NIC" value={form.father.nic} onChange={(e) => handleChange(e, 'father')} /><br />
        <input type="email" name="email" placeholder="Email (optional)" value={form.father.email} onChange={(e) => handleChange(e, 'father')} /><br />

        <h3>Previous School</h3>
        <input type="text" name="previousSchool" placeholder="Previous School" value={form.previousSchool} onChange={handleChange} /><br />

        <h3>Subjects</h3>
        <input type="text" name="subjects" placeholder="Subjects (comma separated)" value={form.subjects} onChange={handleChange} /><br />

        <h3>Nominee Details</h3>
        <input type="text" name="name" placeholder="Name" value={form.nominee.name} onChange={(e) => handleChange(e, 'nominee')} /><br />
        <input type="text" name="address" placeholder="Address" value={form.nominee.address} onChange={(e) => handleChange(e, 'nominee')} /><br />
        <input type="text" name="mobile" placeholder="Mobile Number" value={form.nominee.mobile} onChange={(e) => handleChange(e, 'nominee')} /><br />
        <input type="text" name="nic" placeholder="NIC" value={form.nominee.nic} onChange={(e) => handleChange(e, 'nominee')} /><br />

        <h3>Medical Info</h3>
        <textarea name="medical" placeholder="Medications / Illness" value={form.medical} onChange={handleChange} /><br />

        <button type="submit">Register Student</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}
