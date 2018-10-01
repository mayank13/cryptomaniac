const request = require('request');

module.exports = {
	getProducts : getProducts,
	getPrice : getPrice

}

/** Get products for a particular exchange */
function getProducts (payload,callback){
	moneedaRequest(`api/exchanges/${payload.exchange}/products`, callback);
}

/** Get the price of a product in a particular exchange */
function getPrice (payload,callback){
    var productId = payload.productId;
	moneedaRequest(`api/exchanges/${payload.exchange}/ticker?product=${productId}`, callback);
}

/** Common helper to get data from Moneeda API */
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
