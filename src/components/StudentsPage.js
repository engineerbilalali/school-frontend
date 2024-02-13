import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentPage.css';

function StudentsPage() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [studentName, setStudentName] = useState('');

    useEffect(() => {
        // Assuming your backend server is running on 'http://localhost:3000'
        axios.get('http://localhost:3000/students').then(response => {
            setStudents(response.data);
        });
    }, []);

    const handleAddOrUpdateStudent = () => {
        if (selectedStudent) {
            axios.put(`http://localhost:3000/students/${selectedStudent}`, { name: studentName })
                .then(() => {
                    fetchStudents();
                    setStudentName('');
                    setSelectedStudent(null);
                });
        } else {
            axios.post('http://localhost:3000/students', { name: studentName })
                .then(() => {
                    fetchStudents();
                    setStudentName('');
                });
        }
    };

    const fetchStudents = () => {
        axios.get('http://localhost:3000/students').then(response => {
            setStudents(response.data);
        });
    };

    const handleEditStudent = (id, name) => {
        setSelectedStudent(id);
        setStudentName(name);
    };

    const handleDeleteStudent = (id) => {
        axios.delete(`http://localhost:3000/students/${id}`)
            .then(() => {
                fetchStudents();
            });
    };

    return (
        <div className="students-container">
            <h1>Students</h1>
            <div className="student-input-container">
                <input
                    className="student-input"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Student Name"
                />
                <button className="add-update-btn" onClick={handleAddOrUpdateStudent}>
                    {selectedStudent ? 'Update' : 'Add'}
                </button>
            </div>
            <div className="student-list">
                {students.map(student => (
                    <div key={student.id} className="student-list-item">
                        {student.name}
                        <div>
                            <button className="edit-btn" onClick={() => handleEditStudent(student.id, student.name)}>Edit</button>
                            <button className="delete-btn" onClick={() => handleDeleteStudent(student.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StudentsPage;
