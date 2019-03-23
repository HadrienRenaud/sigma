import React from 'react';
import PropTypes from 'prop-types';
import { Header, Icon, Segment } from 'semantic-ui-react';
import {Link} from "react-router-dom";

/**
 * @class Définit le composant Author, qui représente un lien vers un auteur d'un post
 * @author hadi
 * @extends React.Component
 */
class Author extends React.Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
    };

    render() {
        let link = "/";

        if (this.props.auth.uid)
            link = '/users/' + this.props.auth.uid;
        else if (this.props.auth.gid)
            link = '/groups/' + this.props.auth.gid;

        return <Link to={link}> {this.props.auth.name}</Link>;
    }
}

/**
 * @class Définit le composant Post, qui représente une publication effectuée par un ou des groupes.
 * @author manifold
 * @extends React.Component
 */
class Post extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        location: PropTypes.string,
        authors: PropTypes.arrayOf(PropTypes.object)
    }

    eventLocation() {
        if (this.props.hasOwnProperty("location") && this.props.location !=null) {
            return <div>
                <Icon name='map' color="blue" />
                {this.props.location}
            </div>;
        }
    }

    render() {

        let authors = this.props.authors || [];

        return (
            <Segment>
                <Header as="h2">
                    {this.props.title}
                    <Header.Subheader>
                        {authors.map((auth,i) => {
                            if (i === 0)
                                return <span key={auth.uid || auth.gid}>par: <Author auth={auth}/></span>;
                            else
                                return <span key={auth.uid || auth.gid}> et <Author auth={auth}/></span>;
                        })}
                    </Header.Subheader>
                </Header>
                {this.eventLocation()}
                <p>
                    {this.props.content}
                </p>
            </Segment>
        );
    }
}

export default Post;