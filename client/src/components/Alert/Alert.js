import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

// As per the official docs of redux, better to export both version for testing (undecorated)

export const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <div key={alert.id} className={['alert', alert.msgType].join(' ')}>
        { alert.msg }
    </div>
));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert);
