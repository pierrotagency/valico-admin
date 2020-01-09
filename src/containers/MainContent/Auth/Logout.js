import React, { Component } from 'react';
import {  withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { activateNonAuthLayout, logoutUser } from '../../../store/actions';

class Logout extends Component {

    constructor(props) {
        super(props);
        this.state = {  };
    }

    componentDidMount() {     
        this.props.activateNonAuthLayout(); // TODO integrate with user session
        logoutUser();     
        this.props.history.push('/login');
    }

    render() {
        return (
            <React.Fragment>
               <h1>&nbsp;</h1>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
     return {  };
}

export default withRouter(connect(mapStatetoProps,{ activateNonAuthLayout })(Logout));

