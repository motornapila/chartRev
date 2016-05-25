//var express = require('express');
//var router  = express.Router();
var mongoose = require('mongoose');
var DMAudit = require('../models/DMmodel.js');

module.exports = function(app){

	app.get('/api/audits/:code', function(req, res, next){

		var query = DMAudit.find({
			auditCode: req.params.code
		});

		query.exec(function(err, data){
			if(err)
				res.send(err);

			res.json(data);
		});
	});



	app.post('/api/audits', function(req, res, next){
		
		var newDM = new DMAudit(req.body);
		
		newDM.save(function(err){
			if(err)
				res.send(err);

			res.json(req.body);
		});
	});
};
