import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getUsers, addUser } from '../../redux/actions/user';
import { setAlert } from '../../redux/actions/alert';

const UserPanel = ({ users, addUser, getUsers, setAlert, openHobbyPanel, activePerson }) => {

    const [formData, setFormData] = useState({
        name: ''
    });

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = async e => {
        e.preventDefault();

        // eslint-disable-next-line
        if (formData.name === '') {
            setAlert('Name can not be blank. Please fill.', 'warning');
            return;
        }

        addUser(formData.name);
    };

    return (
        <div className="col-3">
            <form onSubmit={e => onSubmit(e)} className="dashboard__user-add">
                <input type="text" name="name" placeholder="Enter user name" onChange={e => onChange(e)} />
                <button type="submit">Add</button>
            </form>
            {users !== null && users.length > 0 && <ul className="dashboard__user-list">
                {users.map(user => <li className={user.id === activePerson ? "active" : null} onClick={() => openHobbyPanel(user.id, user.name)} data-user={user.id} key={user.id}>{user.name}</li>)}
            </ul>}
        </div>
    )
}

UserPanel.propTypes = {
    users: PropTypes.array.isRequired,
    addUser: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    openHobbyPanel: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    users: state.user
});

export default connect(mapStateToProps, { addUser, getUsers, setAlert })(UserPanel);
