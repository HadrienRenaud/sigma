export default function(API_HOST) {
    fetch(`${API_HOST}/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
        }),
    })
        .then(result => result.json())
        .then(result => {
            // here we're filtering out any type information unrelated to unions or interfaces
            const filteredData = result.data.__schema.types.filter(
                type => type.possibleTypes !== null,
            );
            result.data.__schema.types = filteredData;
            localStorage.setItem('fragmentTypes', JSON.stringify(result.data));
        });
}