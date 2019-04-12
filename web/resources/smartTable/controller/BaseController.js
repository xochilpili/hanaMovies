sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
],function(Controller, History){
	"use strict";
	return Controller.extend("exercise.smartable.controller.BaseController",{
		getRouter: function(){
			return this.getOwnerComponent().getRouter();
		},
		getModel: function(modelName){
			return this.getView().getModel(modelName);
		},
		setModel: function(oModel, modelName){
			return this.getView().setModel(oModel, modelName);
		},
		getResourceBundle: function(){
			return this.getOwnerComponent().getModel('i18n').getResourceBundle();
		},
		onNavBack: function(){
			const sPrevHash = History.getInstance().getPreviousHash();
			sPrevHash !== undefined ? history.go(-1) : this.getRouter().navTo('master',{},true);
		}
	});
});