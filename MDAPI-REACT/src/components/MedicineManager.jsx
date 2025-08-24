import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import config from './config.js';

const MedicineManager = () => {
  const [medicines, setMedicines] = useState([]);
  const [medicine, setMedicine] = useState({
    id: '',
    name: '',
    brand: '',
    category: '',
    price: '',
    quantity: '',
    expiryDate: '',
    supplier: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedMedicine, setFetchedMedicine] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/medicineapi`;

  useEffect(() => {
    fetchAllMedicines();
  }, []);

  const fetchAllMedicines = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setMedicines(res.data);
    } catch (error) {
      setMessage('Failed to fetch medicines.');
    }
  };

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in medicine) {
      if (!medicine[key] || medicine[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addMedicine = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, medicine);
      setMessage('Medicine added successfully.');
      fetchAllMedicines();
      resetForm();
    } catch (error) {
      setMessage('Error adding medicine.');
    }
  };

  const updateMedicine = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, medicine);
      setMessage('Medicine updated successfully.');
      fetchAllMedicines();
      resetForm();
    } catch (error) {
      setMessage('Error updating medicine.');
    }
  };

  const deleteMedicine = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllMedicines();
    } catch (error) {
      setMessage('Error deleting medicine.');
    }
  };

  const getMedicineById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedMedicine(res.data);
      setMessage('');
    } catch (error) {
      setFetchedMedicine(null);
      setMessage('Medicine not found.');
    }
  };

  const handleEdit = (med) => {
    setMedicine(med);
    setEditMode(true);
    setMessage(`Editing medicine with ID ${med.id}`);
  };

  const resetForm = () => {
    setMedicine({
      id: '',
      name: '',
      brand: '',
      category: '',
      price: '',
      quantity: '',
      expiryDate: '',
      supplier: ''
    });
    setEditMode(false);
  };

  return (
    <div className="student-container">

      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>Medicine Store Management</h2>

      <div>
        <h3>{editMode ? 'Edit Medicine' : 'Add Medicine'}</h3>
        <div className="form-grid">
          <input type="number" name="id" placeholder="ID" value={medicine.id} onChange={handleChange} />
          <input type="text" name="name" placeholder="Name" value={medicine.name} onChange={handleChange} />
          <input type="text" name="brand" placeholder="Brand" value={medicine.brand} onChange={handleChange} />
          <input type="text" name="category" placeholder="Category" value={medicine.category} onChange={handleChange} />
          <input type="number" name="price" placeholder="Price" value={medicine.price} onChange={handleChange} />
          <input type="number" name="quantity" placeholder="Quantity" value={medicine.quantity} onChange={handleChange} />
          <input type="date" name="expiryDate" placeholder="Expiry Date" value={medicine.expiryDate} onChange={handleChange} />
          <input type="text" name="supplier" placeholder="Supplier" value={medicine.supplier} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addMedicine}>Add Medicine</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateMedicine}>Update Medicine</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <div>
        <h3>Get Medicine By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter ID"
        />
        <button className="btn-blue" onClick={getMedicineById}>Fetch</button>

        {fetchedMedicine && (
          <div>
            <h4>Medicine Found:</h4>
            <pre>{JSON.stringify(fetchedMedicine, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h3>All Medicines</h3>
        {medicines.length === 0 ? (
          <p>No medicines found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(medicine).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((med) => (
                  <tr key={med.id}>
                    {Object.keys(medicine).map((key) => (
                      <td key={key}>{med[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(med)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteMedicine(med.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineManager;
