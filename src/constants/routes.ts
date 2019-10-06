export const ROUTES = {
    LOGIN: '/login',
    ME: '/me',
    USER: '/user/:uid',
    GROUP: '/group/:group',
    GROUPS: '/groups',
    TOL: '/tol',
    ASSOCIATIONS: '/assos',
    EVENTS: '/events',
    EVENT: '/event/:eid',
    NEW_EVENT: '/new/event',
};

export const RoutesBuilders = {
    User: (uid: string) => `/user/${uid}`,
    Group: (gid: string) => `/group/${gid}`,
    Event: (eid: string) => `/event/${eid}`,
};
