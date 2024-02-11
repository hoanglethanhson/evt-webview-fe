
document.getElementById("getDataForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let config = retrieveLocalConfig();
    if (config) {
        console.log(`Config with version ${config.version} has been retrieved from local storage`);
        let version = config.version;
        let request = generateRequestWithVersion(version);
        fetchConfig(request);
    } else {
        fetchConfig(getLatestVersionRequest);
    }
});

function retrieveLocalConfig() {
    let config = localStorage.getItem('config');
    if (config) {
        config = JSON.parse(config);
        return config;
    } else {
        console.log('No config data found in local storage, getting latest config from server');
        return null;
    }
}
function fetchConfig(request) {
    fetch(request)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Something went wrong on api server!');
            }
        })
        .then(({version, value}) => {
            if (version === null || value === null) {
                console.log('Local config is up to date, no need to update from server');
                return;
            }
            console.log(`Config with new version ${version} has been retrieved from server`);
            localStorage.setItem('config', JSON.stringify({version, value}));
        })
        .catch(error => {
            console.error(error);
        });
}

const getLatestVersionRequest = new Request(`http://localhost:8080/config`, {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    headers: new Headers({
        'Content-Type': 'text/plain'
    })
});

function generateRequestWithVersion(version) {
    return new Request(`http://localhost:8080/config/${version}`, {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers({
            'Content-Type': 'text/plain'
        })
    });
}




