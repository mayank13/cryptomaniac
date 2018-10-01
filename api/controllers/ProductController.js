/**
 * ProductController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const async = require('async');
const _ = require('lodash');

module.exports = {
	home : home,
	getCommonProducts : getCommonProducts,
	getProductPrices : getProductPrices,
};

var EXCHANGES  = ['BNB','BTX','BFX'];

function home(req, res){
	return res.view('homepage', {
		exchanges : EXCHANGES
	})
}

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

/** Get the product prices for all the exchanges configured */
function getProductPrices(req,res){
	var productId = req.param('productId');
	async.map(EXCHANGES , function(exchange, callback){
		CryptoService.getPrice({
			exchange : exchange,
			productId : productId
		},function(err, results){
			if(err){
				callback(err);
				return;
			}
			callback(null, {
				exchange : exchange,
				price : results.price
			});
		})
	}, function(err, prices){
		if(err){
			res.serverError(new Error(err));
			return;
		}
		res.send( prices );
	})
}