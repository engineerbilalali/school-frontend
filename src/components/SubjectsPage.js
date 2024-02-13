import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SubjectsPage.css';

function SubjectsPage() {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [subjectName, setSubjectName] = useState('');

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = () => {
        axios.get('https://fluffy-frog-loincloth.cyclic.app/subjects').then(response => {
            setSubjects(response.data);
        });
    };

    const handleAddOrUpdateSubject = () => {
        if (selectedSubject) {
            axios.put(`https://fluffy-frog-loincloth.cyclic.app/subjects/${selectedSubject}`, { name: subjectName })
                .then(() => {
                    fetchSubjects();
                    setSubjectName('');
                    setSelectedSubject(null);
                });
        } else {
            axios.post('https://fluffy-frog-loincloth.cyclic.app/subjects', { name: subjectName })
                .then(() => {
                    fetchSubjects();
                    setSubjectName('');
                });
        }
    };

    const handleEditSubject = (id, name) => {
        setSelectedSubject(id);
        setSubjectName(name);
    };

    const handleDeleteSubject = (id) => {
        axios.delete(`https://fluffy-frog-loincloth.cyclic.app/subjects/${id}`)
            .then(() => {
                fetchSubjects();
            });
    };

    return (
        <div className="students-container"> 
            {/* We are reusing the students-container class from the CSS file.*/}
            <h1>Subjects</h1>
            <div className="student-input-container">
                <input
                    className="student-input"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    placeholder="Subject Name"
                />
                <button className="add-update-btn" onClick={handleAddOrUpdateSubject}>
                    {selectedSubject ? 'Update' : 'Add'}
                </button>
            </div>
            <div className="student-list">
                {subjects.map(subject => (
                    <div key={subject.id} className="student-list-item">
                        {subject.name}
                        <div>
                            <button className="edit-btn" onClick={() => handleEditSubject(subject.id, subject.name)}>Edit</button>
                            <button className="delete-btn" onClick={() => handleDeleteSubject(subject.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SubjectsPage;
