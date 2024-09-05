import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/customers')
      .then(response => {
        if (Array.isArray(response.data)) {
          setCustomers(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
          setCustomers([]);
        }
      })
      .catch(error => {
        console.error('Error fetching customer data:', error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      axios.delete(`http://localhost:5000/api/customers/${id}`)
        .then(() => {
          setCustomers(customers.filter(customer => customer._id !== id));
        })
        .catch(error => {
          console.error('Error deleting customer:', error);
        });
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <Link to="/new" className="px-4 py-2 bg-blue-500 text-white rounded">Add New Customer</Link>
      <table className="min-w-full table-auto mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Customer Name</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <tr key={customer._id}>
                <td className="border px-4 py-2">{new Date(customer.createdAt).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{customer.customerName}</td>
                <td className="border px-4 py-2">{customer.totalAmount}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleEdit(customer._id)} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
                  <button onClick={() => handleDelete(customer._id)} className="px-2 py-1 bg-red-500 text-white rounded ml-2">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">No customers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
