const requestBody = {value: '{"action":"RECORD","imei":"8BE90875-7773-4406-9814-CD8D81E2DD2A","event_src":"SYSTEM","time_stamp":"1701144278244","language":"vi","os_version":"16.7.2","user_session_id":"4FDD3093-CDA5-4A75-930E-2F5DF44BAF98","id":"20231128110438","event_value":"{\\"requestId\\":\\"AppPushInst01HGA1GBBX5JJCZH0EE8JFED9Y\\",\\"campaignService\\":\\"cm_apppush\\",\\"sendDate\\":\\"1701144179421\\",\\"campaignId\\":\\"CAMP-01HG7HPK9NTCGEGBY96MTXST1Q\\",\\"contentId\\":\\"357\\"}","app_version":"6.8.9","object_name":"Login_indirect_log_noti_system_log_cmnoti","identity":"84329508118","manufacturer":"Apple","time_zone":"Asia/Ho_Chi_Minh","os":"iOS","object_type":"LOG","ip_addr":"172.18.61.22","device_session_id":"30FC3CBB-0E1C-4E21-9B4A-99EEAEDB276A","model":"iPhone 8 Plus","app_name":"Viettel Money","universeFake":"VIETTELPAY","systemFake":"APP"}'};
const request = new Request('http://localhost:8080/config-create', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    mode: 'cors',
    redirect: 'follow',
    headers: new Headers({
        'Content-Type': 'application/json'
    })
});

async function postEvent(request) {
    await fetch(request)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Something went wrong on api server!');
            }
        })
        .then(() => console.log('Event has been pushed '))
        .catch(error => {
            console.error(error);
        });
}


document.getElementById("eventForm").addEventListener("submit", function (event) {
    event.preventDefault();
    postEvent(request)
        .then(response => console.log(response))
        .catch(error => console.error("Error push event: " + error));
});