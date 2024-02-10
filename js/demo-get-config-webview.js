//construct a fetch request object to localhost:8080/demo with path variable

//call rest api with fetch and request object
function fetchConfig(request) {
    fetch(request)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Something went wrong on api server!');
            }
        })
        .then(({id, value}) => {
            console.debug(`Config with id ${id} has value ${value}`);
            localStorage.setItem('config#'+ id, JSON.stringify({id, value}));
        })
        .catch(error => {
            console.error(error);
        });
}


const version = 'abc';
const request = new Request(`http://localhost:8080/config/${version}`, {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    headers: new Headers({
        'Content-Type': 'text/plain'
    })
});

fetchConfig(request);

