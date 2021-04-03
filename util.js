export const rando = (min, max) =>
{
    // returns a numbers between min and max
    return Math.floor(Math.random() * max) + min;
};

export const pokeFetch = (resource, options) =>
{
    const baseRoute = 'https://pokeapi.co/api/v2';

    const finalRoute = `${baseRoute}/${resource}/${options}`;
    console.log('final destination: ', finalRoute);

    return fetch(finalRoute)
    .then(function(response)
    {
        // if i were smart
        // i would put some error handling here
        // just in case there is no json response

        if (response.status !== 200)
        {
            console.log('bad response: ', response);
            throw new Error('Why do bad things happen to me?');
        }
        return response.json();
    })
    .then((data) =>
    {
        return data;
    })

    // handle the rejection
    .catch((err) =>
    {
        // i should do something
        console.log(`Error fetching ${err}`);
    });
}