import { addMockFunctionsToSchema } from 'graphql-tools';
import { SchemaLink } from 'apollo-link-schema';
import schema from './schema';

const mocks = {
    Query: () => ({
        // allFilms: () => films,
    }),
};

addMockFunctionsToSchema({ mocks, schema });

export default new SchemaLink({ schema });
