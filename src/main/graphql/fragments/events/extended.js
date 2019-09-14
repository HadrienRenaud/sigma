import gql from "graphql-tag";
import eventBase from "./base.graphql";

export const eventExtended = gql`
    fragment eventExtended on Event {
        ...eventBase
    }
    ${eventBase}
`;
