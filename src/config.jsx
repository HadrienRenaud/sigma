
// eslint-disable-next-line no-undef
export const apiUrl = process.env.REACT_APP_API_URL || "http://129.104.201.11:3000";
// eslint-disable-next-line no-undef
console.log(process.env.REACT_APP_API_URL, apiUrl);
export const graphqlApiUrl = apiUrl + '/graphql';
