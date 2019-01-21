import { addMockFunctionsToSchema } from 'graphql-tools';
import { SchemaLink } from 'apollo-link-schema';
import schema from './schema';
import User from "./mock-data/user";
import Group from "./mock-data/group"

const mocks = {
    User: () => User,
    Group: () => Group
};

addMockFunctionsToSchema({ mocks, schema });
// addMockFunctionsToSchema({ mocks, schema, preserveResolvers: true });

export default new SchemaLink({ schema });
