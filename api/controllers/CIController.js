/**
 * CiController
 *
 * @description :: Server-side logic for managing cis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var PASS = 'mongolo';

module.exports = {

	get: function(req, res){
		CI.find().limit(1).exec(function(err, ci){
			if(err) return res.serverError(err);
			if(!ci.length) return res.notFound();
			return res.send(200, ci[0].points);
		});
	},

	add: function(req, res){
		CI.find().limit(1).exec(function(err, ci){
			if(err) return res.serverError(err);
			if(!ci.length) return res.notFound();
			ci = ci[0];
			ci.points += 1;
			ci.save(function(err){
				if(err) return res.serverError(err);
				sails.sockets.blast('updated', ci);
				return res.send(200, ci.points);
			});
		});
	},

	remove: function(req, res){
		CI.find().limit(1).exec(function(err, ci){
			if(err) return res.serverError(err);
			if(!ci.length) return res.notFound();
			ci = ci[0];
			if(ci.points < 1) return res.badRequest();
			ci.points -= 1;
			ci.save(function(err){
				if(err) return res.serverError(err);
				sails.sockets.blast('updated', ci);
				return res.send(200, ci.points);
			});
		});
	},

	admin: function(req, res){
		if(req.param('pass') === PASS) req.session.authenticated = true;
		return res.redirect('/');
	},

	isAdmin: function(req, res){
		var data = {admin: false};
		if(req.session.authenticated) data.admin = true;
		return res.json(data);
	}

};
