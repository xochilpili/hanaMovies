/*eslint no-console: 0, no-unused-vars: 0, no-undef:0, no-process-exit:0, new-cap:0*/
/*eslint-env node, es6 */

"use strict";

const uuid = require('uuid/v4');
const cds = require('@sap/cds');

/*const handlers = (entities)=>{
	const {Catalog} = entities;
	this.after('READ','MovieRates',(entity)=>{
		if(entity.length>0){
			entity[0].demo = 'Demo After read';
		}
	});
};*/

module.exports = function(entities){
	const {Catalog} = entities;
	this.before("READ", entities.MovieRates, (entity) => {
		return entity.filter(item=>{
			if(item.USERCOUNT === 6){
				console.log(item.USERCOUNT);
				return true;
			}
			return false;
		});
		//console.log(entity.elements);
	});
};