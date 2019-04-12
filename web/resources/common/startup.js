/*eslint no-console: 0, no-unused-vars: 0, no-use-before-define: 0, no-redeclare: 0, no-shadow:0*/

function onLoadSession(obj){
	try{
		const result = JSON.parse(obj);
		/*if(Array.isArray(result.session) && result.session.length>0){
			return result.session[0].familyName !=='' ? result.session[0].givenName + ' ' + result.session[0].familyName : result.session[0].givenName;
		}*/
		return result.userInfo.logonName;
	}catch(e){
		return '';
	}
}

function getSessionInfo(){
	const url = '/node/sessionInfo';
	return onLoadSession(
		jQuery.ajax({
			url,
			method:'GET',
			dataType:'json',
			async:false
		}).responseText
	);
}


function localShellStartup(shellName){
	sap.ui.getCore().attachInit(()=>{
		const ComponentContainer = new sap.ui.core.ComponentContainer({
			height: '100%'
		});
		const username = getSessionInfo();
		new sap.ui.unified.Shell({
			id:'appShell',
			icon:'/images/sap_18.png',
			headEndItems: new sap.ui.unified.ShellHeadItem({
				icon:'sap-icon://log',
				tooltip:'LogOff',
				press: ()=>{
					window.location.href='/my/logout';
				}
			}),
			user: new sap.ui.unified.ShellHeadUserItem({
				image: 'sap-icon://person-placeholder',
				username: username
			}),
			content: ComponentContainer
		}).placeAt('content');
		const oComponent = new sap.ui.component({
			id:'comp',
			name:shellName,
			manifestFirst:true,
			async:true
		}).then((oComponent)=>{
			ComponentContainer.setComponent(oComponent);
		});
	});
}