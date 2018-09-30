/**
 * ProductController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const async = require('async');
const _ = require('lodash');

module.exports = {
	getCommonProducts : getCommonProducts
};

var EXCHANGES  = ['BNB','BTX','BFX'];

/** Get the common products  across exchanges*/
function getCommonProducts (req,res){
	async.map(EXCHANGES , function(exchange, callback){
		CryptoService.getProducts({
			exchange : exchange
		},callback)
	}, function(err, allProducts){
		if(err){
			res.serverError(new Error(err));
			return;
		}
		var commonProducts = _.map(_.intersectionBy(...allProducts, 'id'), function(product){
			return {
				"name"  : product.id,
				"value" : product.id,
				"text"  : product.id
			}
		}); //Find the intersection and return the array of unqiue products
		res.send({
			success : true,
			results : commonProducts
		});
	})
}
