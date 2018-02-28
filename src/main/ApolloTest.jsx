import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_GROUP = gql`
  query {
    groups{
      name
      id
    }
  }
`

const ApolloTest = () => (
  <Query query={GET_GROUP}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error :(</div>;

      return (
        <div>Salut</div>
      )
    }}
  </Query>
)

export default ApolloTest