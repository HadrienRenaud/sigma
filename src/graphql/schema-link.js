import { addMockFunctionsToSchema } from 'graphql-tools';
import { SchemaLink } from 'apollo-link-schema';
import schema from './schema';
import {User} from "./mock-data/user";
import {Group} from "./mock-data/group"
import {Event} from "./mock-data/event"
import {Announcement} from "./mock-data/announcement";

const mocks = {
    User: () => {return new User()},
    Group: () => {return new Group()},
    SimpleGroup: () => {return new Group()},
    MetaGroup: () => {return new Group()},
    Event: () => {return new Event();},
    Announcement: () => {return new Announcement();},
    Message: () => {return new Announcement();},
};

addMockFunctionsToSchema({ mocks, schema });
// addMockFunctionsToSchema({ mocks, schema, preserveResolvers: true });

export default new SchemaLink({ schema });
