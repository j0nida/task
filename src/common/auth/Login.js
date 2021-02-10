import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { Link } from 'react-router-dom'
import './Login.scss';

import { list, edit } from './actions'

class Login extends Component {    
    render() {
        return (
            <div>
                <span onClick={this.props.edit(this.props.user.id)}>{this.props.user.username}</span>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ list, edit }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);