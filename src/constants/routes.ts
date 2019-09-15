export const ROUTES = {
    LOGIN: '/login',
    ME: '/me',
    USER: '/user/:uid',
    GROUP: '/group/:group',
};

export const RoutesBuilders = {
    User: (uid: string) => `/user/${uid}`,
    Group: (gid: string) => `/group/${gid}`,
};
