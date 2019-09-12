import React, { useState } from 'react';
import UserPanel from '../../components/UserPanel/UserPanel';
import HobbyPanel from '../../components/HobbyPanel/HobbyPanel';

const Dashboard = () => {
    const [formData, setFormData] = useState({
        userID: '',
        userName: '',
        isChecked: false
    });

    const handleUserClick = (id, name) => {
        setFormData({
            ...formData,
            userID: id,
            userName: name,
            isChecked: true
        });
    };

    return (
        <div className="dashboard">
            <h1>User Hobbies</h1>
            <div className="row">
                <UserPanel openHobbyPanel={handleUserClick} activePerson={formData.userID} />
                {formData.isChecked && <HobbyPanel activeName={formData.userName} activeID={formData.userID} />}
            </div>
        </div>
    )
};

export default Dashboard;