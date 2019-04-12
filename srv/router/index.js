/*eslint no-console: 0, no-unused-vars: 0, no-undef:0, no-process-exit:0, new-cap:0*/
/*eslint-env node, es6 */
"use strict";
const express = require('express');

const nodeRoutes = ()=>{
	const app = express.Router();
	app.get('/sessionInfo',(req, res)=>{
		let body = JSON.stringify(req.authInfo);
		return res.type('application/json').status(200).send(body);
	});
	
	return app;
};

const routes = (app, server)=>{
	app.use('/node', nodeRoutes());
};

module.exports = routes;