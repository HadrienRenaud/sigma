import React from 'react';
import PropTypes from 'prop-types';
import { Header, Segment, Label, Link, Button } from 'semantic-ui-react';
import GroupCard from '../group/GroupCard.jsx';

/**
 * @class Définit le composant Post, qui représentera l'ensemble des Posts
 * effectués par les groupes.
 * @author manifold
 * @extends React.Component
 */
class Post extends React.Component {

    static propTypes = {
        data: PropTypes.shape({
            title: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            authors: PropTypes.arrayOf(PropTypes.object).isRequired
        }).isRequired
    }

    render() {

        return (
            <Segment>
                <Header>
                    {this.props.data.title}
                </Header>
                <p>
                    {this.props.data.content}
                </p>
                {this.props.data.authors.map(gr => 
                    <GroupCard key={gr.uid} name={gr.name} website={gr.website}/>
                )}
            </Segment>
        );
    }

}

class GroupPanel extends React.Component {
    constructor(props) { super(props); }
    render() {
        const { groupQuery: { loading, error, accessGroups } } = this.props;
        if (loading) {
            return <li>Loading...</li>;
        } else if (error) {
            return <li>Error</li>;
        }
        return (
            <div>
                {accessGroups.allGroups.map(gr => {
                    return <div key={gr.uid}>
                        <Link to="/group/1"><Button>{gr.name}</Button></Link>
                    </div>;})}
            </div>
        );
    }
}

export default Post;