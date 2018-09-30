const request = require('request');

module.exports = {
	getProducts : getProducts,
	getPrice : getPrice

}

function getProducts (payload,callback){
	moneedaRequest(`api/exchanges/${payload.exchange}/products`, callback);
}

function getPrice (payload,callback){
	moneedaRequest(`api/exchanges/${payload.exchange}/ticker`, callback);
}

function moneedaRequest(api, callback) {

    var options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${sails.config.moneeda.token}`
        },
        url: `${sails.config.moneeda.url}/${api}`,
        json: true
    };

    request(options, function (error, response, body) {
        if (error) {
            callback(error);
            return;
        } else if (response.statusCode >= 400) {
            callback(response);
            return;
        }
        callback(null, body);
    });
}
