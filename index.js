const axios = require('axios');
const token = 'EAAqZAxHD4O6kBAOomucqMpplaNqPMVrDjJyPZABNrRBh9RKYUZAHYxR65ItMVEjoduuBRCj2xjNLpZBXgvgEAtZCPLansaLjrqYZCz4nPoCteT0AYhjZBWPoRfZCdDtDq15eUFCneDjZC4SH1m1fsWA8XC8wyPGPTwZCaXMNZBG7pbKCAZDZD';
const url = `https://graph.facebook.com/v2.6/me/pass_thread_control?access_token=${token}`;

data = {
    recipient: { id: '3730804723656636' },
    target_app_id: 183319479511,
    metadata: 'String to pass to secondary receiver app',
};

axios
    .post(url, data, {
        headers: {
            'content-type': 'application/json',
        },
    })
    .then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
        console.log(err);
    });
