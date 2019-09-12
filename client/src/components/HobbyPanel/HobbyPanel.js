import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { handleHobby } from '../../redux/actions/user';
import { setAlert } from '../../redux/actions/alert';

const HobbyPanel = ({ activeName, activeID, users, handleHobby, setAlert }) => {

    const [formData, setFormData] = useState({
        passion: 'low',
        name: '',
        date: ''
    });

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = async e => {
        e.preventDefault();
        
        // eslint-disable-next-line
        for (let field in formData) {
            let newString = field.charAt(0).toUpperCase() + field.slice(1);
            if (formData[field] === '') {
                setAlert(`${newString} can not be blank. Please fill.`, 'warning');
                return;
            }
        }

        const allHobbies = [...users[activeID-1].hobbies];
        allHobbies.push(formData);
        handleHobby(activeName, activeID, allHobbies);
    }

    const handleDelete = async idx => {
        const allHobies = [...users[activeID-1].hobbies];
        allHobies.splice(idx, 1);
        handleHobby(activeName, activeID, allHobies, false);
    }

    return (
        <div className="col-9">
            <form onSubmit={e => onSubmit(e)} className="dashboard__hobby-add">
                <select name="passion" placeholder="Select passion level" value={formData.passion} onChange={e => onChange(e)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="very high">Very-High</option>
                </select>
                <input type="text" name="name" placeholder="Enter hobby name" onChange={e => onChange(e)}/>
                <input type="number" name="date" placeholder="Enter year" onChange={e => onChange(e)}/>
                <button type="submit">Add</button>
            </form>
            {users[activeID - 1].hobbies !== null && users[activeID - 1].hobbies.length > 0 && <ul className="dashboard__hobby-list">
                {users[activeID - 1].hobbies.map((hobby, idx) => <li key={idx} data-index={idx}>
                    <span>Passion: {hobby.passion}</span>
                    <span>{hobby.name}</span>
                    <span>Since {hobby.date}</span>
                    <span className="dashboard__hobby-delete" onClick={() => handleDelete(idx)}>X</span>
                </li>)}
            </ul>}
        </div>
    )
};

HobbyPanel.propTypes = {
    handleHobby: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    activeID: PropTypes.number.isRequired,
    activeName: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    users: state.user
});

export default connect(mapStateToProps, { handleHobby, setAlert })(HobbyPanel);
