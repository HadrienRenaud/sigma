import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";


export class GroupName extends React.Component {
    static propTypes = {
        group: PropTypes.object.isRequired,
    };

    render() {
        return <Link to={"/groups/" + this.props.group.uid}>{this.props.group.name}</Link>
    }
}

export class UserName extends React.Component {
    static propTypes = {
        user: PropTypes.object.isRequired
    };

    render() {
        return <Link to={"/user/" + this.props.user.uid}>
            {this.props.user.givenName} {this.props.user.lastName}
        </Link>
    }
}
