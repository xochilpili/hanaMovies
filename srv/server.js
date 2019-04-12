/*eslint no-console: 0, no-unused-vars: 0, no-undef:0, no-process-exit:0*/
/*eslint-env node, es6 */
"use strict";

const https = require('https');
const port = process.env.PORT || 3000;
const server = require('http').createServer();

const cds = require('@sap/cds');
const xsenv = require('@sap/xsenv');
const xssec = require('@sap/xssec');
const logging = require('@sap/logging');
const xsHDBConn = require('@sap/hdbext');
const passport = require('passport');
const express = require('express');
const helmet = require('helmet');


https.globalAgent.options.ca = xsenv.loadCertificates();
global.__base = __dirname + '/';
global.__uaa = process.env.UAA_SERVICE_NAME;
const appContext = logging.createAppContext();

const app = express();
app.use(require('compression')({
	threshold: '1b'
}));

app.use(helmet());
app.use(helmet.referrerPolicy({
	policy:'no-referrer'
}));

passport.use("JWT", new xssec.JWTStrategy(xsenv.getServices({
	uaa:{
		tag:'xsuaa'
	}
}).uaa));

app.use(logging.middleware({
	appContext,
	logNetwork: true
}));

app.use(passport.initialize());

const hanaOpts = xsenv.getServices({
	hana:{
		plan: 'hdi-shared'
	}
});

hanaOpts.hana.pooling = true;
app.use(passport.authenticate('JWT',{
	session:false
}), xsHDBConn.middleware(hanaOpts.hana));

const options = {
	kind: 'hana',
	logLevel: 'error'
};

cds.connect(options);
const odataURL = '/odata/v4/dhana.CatalogService/';
cds.serve("gen/csn.json",{
	crashOnError: false
}).at(odataURL).with(require('./lib/handlers')).in(app).catch((error)=>{
	console.log(error);
	process.exit(1);
});

app.get('/',(req,res)=>{
	res.redirect(odataURL);	
});
app.get('/node',(req,res)=>{
	res.redirect(odataURL);
});
require('./router')(app,server);
server.on('request', app);
server.listen(port, ()=>{
	console.info(`HTTP Server: ${server.address().port}`);
});