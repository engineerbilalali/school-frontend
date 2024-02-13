import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TeachersPage.css';

function TeachersPage() {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [teacherName, setTeacherName] = useState('');

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = () => {
        axios.get('https://fluffy-frog-loincloth.cyclic.app/teachers').then(response => {
            setTeachers(response.data);
        });
    };

    const handleAddOrUpdateTeacher = () => {
        if (selectedTeacher) {
            axios.put(`https://fluffy-frog-loincloth.cyclic.app/teachers/${selectedTeacher}`, { name: teacherName })
                .then(() => {
                    fetchTeachers();
                    setTeacherName('');
                    setSelectedTeacher(null);
                });
        } else {
            axios.post('https://fluffy-frog-loincloth.cyclic.app/teachers', { name: teacherName })
                .then(() => {
                    fetchTeachers();
                    setTeacherName('');
                });
        }
    };

    const handleEditTeacher = (id, name) => {
        setSelectedTeacher(id);
        setTeacherName(name);
    };

    const handleDeleteTeacher = (id) => {
        axios.delete(`https://fluffy-frog-loincloth.cyclic.app/teachers/${id}`)
            .then(() => {
                fetchTeachers();
            });
    };

    return (
        <div className="students-container"> 
            {/* We are reusing the students-container class from the CSS file.*/}
            <h1>Teachers</h1>
            <div className="student-input-container">
                <input
                    className="student-input"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    placeholder="Teacher Name"
                />
                <button className="add-update-btn" onClick={handleAddOrUpdateTeacher}>
                    {selectedTeacher ? 'Update' : 'Add'}
                </button>
            </div>
            <div className="student-list">
                {teachers.map(teacher => (
                    <div key={teacher.id} className="student-list-item">
                        {teacher.name}
                        <div>
                            <button className="edit-btn" onClick={() => handleEditTeacher(teacher.id, teacher.name)}>Edit</button>
                            <button className="delete-btn" onClick={() => handleDeleteTeacher(teacher.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeachersPage;
