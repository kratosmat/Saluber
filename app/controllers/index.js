callLoginPage();

$.index.open();

function callLoginPage() {
	setTimeout(function()
		{
			var newWin = Alloy.createController('login').getView();
			/*
			if(OS_IOS){
				Alloy.Globals.navWindow.openWindow(newWin);
			}
			
			if(OS_ANDROID){
				newWin.open();
			}			
			*/
			newWin.open();
			$.index.close();
	},2000);		
}