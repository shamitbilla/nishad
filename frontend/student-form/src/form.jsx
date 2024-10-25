import React, { useState } from 'react';
import axios from 'axios';

export const StudentForm = () => {
    const [rno, setRno] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');
    const [message, setMessage] = useState('');

    const handleCreate = async (e) => {
        try {
            await axios.post('http://localhost:3000/', { rno, firstname, lastname, password, contact });
            setMessage('Student created successfully!');
        } catch (error) {
            setMessage('Error creating student: ' + error.message);
        }
    };

    const handleUpdate = async (e) => {
        try {
            await axios.put('http://localhost:3000/', { rno, contact });
            setMessage('Contact updated successfully!');
        } catch (error) {
            setMessage('Error updating contact: ' + error.message);
        }
    };

    const handleView = async (e) => {
        try {
            const response = await axios.get('http://localhost:3000/', { params: { rno } });
            setMessage(`Student Data: ${JSON.stringify(response.data)}`);
        } catch (error) {
            setMessage('Error fetching student: ' + error.message);
        }

    };

    const handleDelete = async (e) => {
        try {
            await axios.delete('http://localhost:3000/', { data: { rno, password } });
            setMessage('Student deleted successfully!');
        } catch (error) {
            setMessage('Error deleting student: ' + error.message);
        }
    };

    return (
        <div>
            <h1>Student Management</h1>

                <h2>Create Student</h2>
                <input type="number" placeholder="RNO" value={rno} onChange={(e) => setRno(e.target.value)} required />
                <input type="text" placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                <input type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="text" placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} required />
                <button type="submit" onClick={()=>{
                    handleCreate()
                }} >Create Student</button>


                <h2>Update Contact</h2>
                <input type="number" placeholder="RNO" value={rno} onChange={(e) => setRno(e.target.value)} required />
                <input type="text" placeholder="New Contact" value={contact} onChange={(e) => setContact(e.target.value)} required />
                <button type="submit" onClick={()=>{
                    handleUpdate()
                }} >Update Contact</button>


                <h2>View Student</h2>
                <input type="number" placeholder="RNO" value={rno} onChange={(e) => setRno(e.target.value)} required />
                <button type="submit" onClick={()=>{
                    handleView()
                }} >View Student</button>


        
                <h2>Delete Student</h2>
                <input type="number" placeholder="RNO" value={rno} onChange={(e) => setRno(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" onClick={()=>{
                    handleDelete()
                }} >Delete Student</button>


            {message && <p>{message}</p>}
        </div>
    );
};

export default StudentForm;