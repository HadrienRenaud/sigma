import React from 'react';
import PropTypes from 'prop-types';
import { Header, Icon, Segment} from 'semantic-ui-react';
import {Link} from "react-router-dom";
import {GroupName} from "../../widgets/SmallWidgets.jsx"
// import GroupCard from '../body/groups/GroupCard.jsx';


// note: ce component est vieux, il date d'avant la stabilisation du schema graphql.
// le nom "Post" prete particulierement a confusion. Post ne correspond a rien, sinon peut-etre
// comme petit nom de "PrivatePost". Le bon terme ici serait plutot `class Message`.
// quoique ce n'est pas sur que l'on veuille avoir un Component Message, puisque
// on veut de toute facon avoir des Component pour chacune des sous-classes
// (pour Event et pour Announcements etc)

/**
 * @class Définit le composant Post, qui représente une publication effectuée par un ou des groupes.
 * @author manifold
 * @extends React.Component
 */
class Post extends React.Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        location: PropTypes.string,
        authors: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    eventLocation() {
        if (this.props.hasOwnProperty("location") && this.props.location !=null) {
            return <div>
                <Icon name='map' color="blue" />
                {this.props.location}
            </div>;
        }
    }

    render() {

        return (
            <Segment>

                <Header as="h2">
                    <Link to={"/events/" + this.props.id}>
                        {this.props.title}
                    </Link>
                    <Header.Subheader>
                        {this.props.authors.map((auth,i) => {
                            if (i === 0) return <span key={auth.uid}>par: <GroupName group={auth}/> </span>;
                            else return <span key={auth.uid}>et <GroupName group={auth}/> </span>;
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