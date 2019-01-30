import React from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import Error404 from "../../errors/Error404.jsx";
import PropTypes from "prop-types";

const GET_USER = gql`
    query getUser($uid: ID) {
        user(uid: $uid) {
            lastName
            givenName
            mail
            phone
            address
            promotion
            memberOf {
                uid
                name
            }
        }
    }
`;


class UserQuery extends React.Component {
    static propTypes = {
        uid: PropTypes.string.isRequired
    };

    render() {
        return (
            <Query query={GET_USER}
                variables={{uid: this.props.uid}}
            >
                {({loading, error, data}) => {
                    if (loading)
                        return <div>Chargement, patientez SVP...</div>;
                    else if (error)
                        return <div>Erreur de chargement graphQL de UserCard.</div>;
                    else if (Object.keys(data) > 0)
                        return <Error404/>;
                    const {user} = data;
                    return React.Children.map(this.props.children, (child, oldProps) => {
                        return React.cloneElement(child, {...oldProps, user: user});
                    }, {user: user,});

                }}
            </Query>
        );
    }
}

export default UserQuery;