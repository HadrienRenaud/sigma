import React from "react";
import {Link, Redirect} from "react-router-dom";
import {UserContext} from "./contexts.jsx";

class Author extends React.Component {
    state = {
        redirectTo: false
    };

    render() {
        if (this.state.redirectTo)
            return <Redirect to={this.state.redirectTo}/>;

        let link = "/", content = "";

        if (this.props.gid) {
            link = "/group/" + this.props.gid;
            content = this.props.name;
        } else if (this.props.uid) {
            if (this.props.uid === this.context.uid) {// ie it's you
                link = "/me";
                content = <span title={this.props.givenName + " " + this.props.lastName}>You</span>;
            } else {
                link = "/user/" + this.props.uid;
                content = <span>{this.props.givenName} {this.props.lastName}</span>;
            }
        }

        return <Link to={link}>
            {content}
        </Link>;
    }
}
Author.contextType = UserContext;

class AuthorList extends React.Component {
    render() {
        let elts = this.props.elements;
        if (elts.length === 0)
            return "";
        else if (elts.length === 1)
            return <Author {... elts[0]}/>;
        else if (elts.length === 2)
            return <span><Author {... elts[0]}/> et <span><Author {...elts[0]}/></span></span>
        else
            return <span>
                {elts.slice(0, -2).map((g, i) =>
                    <span key={i}><Author {...g}/>, </span>
                )}, <Author {...elts[elts.length - 2]}/> et <Author {...elts[elts.length - 1]}/>
            </span>;
    }
}

export {Author, AuthorList};