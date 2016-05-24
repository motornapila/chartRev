//var express = require('express');
//var router  = express.Router();
var mongoose = require('mongoose');
var DMAudit = require('../models/DMmodel.js');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

module.exports = function(app){
	app.post('/api/audits', function(req, res, next){
		
		var newDM = new DMAudit(req.body);

		//console.log(newDM);
		
		newDM.save(function(err){
			if(err)
				res.send(err);

			res.json(req.body);
		});
	});
};
