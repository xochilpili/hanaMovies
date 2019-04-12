sap.ui.define([
	"exercise/smarttable/controller/BaseController",
	"sap/ui/model/json/JSONModel"], function(BaseController, JSONModel){
		"use strict";
		return BaseController.extend("exercise.smarttable.controller.App",{
			logout: function(){
				window.location.href='/my/logout';
			},
			onInit: function(){
				this.getView().addStyleClass('sapUiSizeCompact');
				const oConfig = this.getOwnerComponent().getModel('config');
				const userName = oConfig.getProperty('/userName');
				console.log('Username', userName);
				const movieModel = this.getOwnerComponent().getModel('movieModel');
				let oTable = this.getView().byId('movieTable');
				function loadTable(){
					try{
						oTable.setModel(movieModel);
						oTable.setEntitySet("MovieRates");
						const oMeta = movieModel.getServiceMetadata();
						let headerFields = '';
						for(let col of oMeta.dataServices.schema[0].entityType[0].property){
							headerFields += col.name + ',';
						}
						oTable.setInitiallyVisibleFields(headerFields);
					}catch(err){
						console.log(err.toString());
					}
				}
				movieModel.attachMetadataLoaded(movieModel, function(){
					loadTable();
				});
				loadTable();
			},
			onErrorCall: function(oError){
				if(oError.statusCode === 500 || oError.statusCode === 400 || oError.statusCode === "500" || oError.statusCode === "400"){
					const errorRes = JSON.parse(oError.responseText);
					if(!errorRes.error.innererror){
						sap.m.MessageBox.alert(errorRes.error.message.value);
					}else{
						if(!errorRes.error.innererror.message){
							sap.m.MessageBox.alert(errorRes.error.innererror.toString());
						}else{
							sap.m.MessageBox.alert(errorRes.error.innererror.message);
						}
					}
					return ;
				}else{
					sap.m.MessageBox.alert(oError.response.statusText);
					return;
				}
			}
		});
});