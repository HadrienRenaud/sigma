import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';

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
            authors: PropTypes.arrayOf(PropTypes.object).isRequired
        }).isRequired
    }

    render() {
        return (
            <div>
                <Label>
                    {this.props.data.title}
                </Label>
                {this.props.data.description}
                {this.props.data.authors.map(gr => 
                    <div key={gr.uid}>
                        <p >{gr.name}</p>
                        <p>{gr.description}</p>
                        <p>Site : {gr.website}</p>
                    </div>
                )}
            </div>
        );
    }

}

export default Post;