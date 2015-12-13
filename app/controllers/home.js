var args = arguments[0];

// get main and menu view as objects
var menuView;
var mainView;

var activeView = 1;

function createView(viewName) {
	Ti.API.info("creating " + viewName + "...");
	view = Alloy.createController(viewName);
	view.menuButton.add(getMenuButton({
		h: '43',
		w: '60'
	}));
	view.menuButton.addEventListener('click',function(){
		$.drawermenu.showhidemenu();
	    $.drawermenu.menuOpen=!$.drawermenu.menuOpen;
	}); 
	Ti.API.info("created " + viewName); 
	return view;
};


function getMenuView(){
	if(menuView==null) {
		
		menuView = Alloy.createController('menuview');
		
		menuView.menuTable.addEventListener('click',function(e){
			$.drawermenu.showhidemenu();
		    $.drawermenu.menuOpen = false; //update menuOpen status to prevent inconsistency.
		    
		    if(e.rowData.id==="row1"){
		        if(activeView!=1){
		        	$.drawermenu.drawermainview.removeAllChildren();
		            $.drawermenu.drawermainview.add(createView('ListBookings').getView());
		            //getListBookingsView().reloadMap();
		        }
				activeView = 1;
				
		    }
		    /*
		    if(e.rowData.id==="row2"){
		        if(activeView!=2){
				    // init first step to booking
				    Ti.App.Properties.setString('new-booking', 0);						        
		        	$.drawermenu.drawermainview.removeAllChildren();
		            $.drawermenu.drawermainview.add(createView('Booking').getView());
		        } 
		        activeView = 2;		        
		    }
		    if(e.rowData.id==="row3"){
				if(activeView!=3){
	        	    $.drawermenu.drawermainview.removeAllChildren();
	                $.drawermenu.drawermainview.add(createView('UserProfile').getView());
	            }
		        activeView = 3;
		    }
		    */
		    
		    if(e.rowData.id==="row4"){
				if(activeView!=4){
	        	    $.drawermenu.drawermainview.removeAllChildren();
	                $.drawermenu.drawermainview.add(createView('DoctorAgenda').getView());
	            }
		        activeView = 4;
		    }
		    if(e.rowData.id==="row5"){
				if(activeView!=5){
	        	    $.drawermenu.drawermainview.removeAllChildren();
	                $.drawermenu.drawermainview.add(createView('ListDoctors').getView());
	            }
		        activeView = 5;
		    }
		    if(e.rowData.id==="row6"){
				if(activeView!=6){
	        	    $.drawermenu.drawermainview.removeAllChildren();
	                $.drawermenu.drawermainview.add(createView('StationAgenda').getView());
	            }
		        activeView = 6;
		    }
			if(e.rowData.id==="row7"){
				if(activeView!=7){
	        	    $.drawermenu.drawermainview.removeAllChildren();
	                $.drawermenu.drawermainview.add(createView('ListStations').getView());
	            }
		        activeView = 7;
		    }
		    if(e.rowData.id==="row8"){
				if(activeView!=8){
	        	    $.drawermenu.drawermainview.removeAllChildren();
	                $.drawermenu.drawermainview.add(createView('PatientProfile').getView());
	            }
		        activeView = 8;
		    }
		    if(e.rowData.id==="row100") {
		    	$.home.close();
		        activeView = 1;
		    }
		    Ti.API.debug(e.rowData.id); 
		    
		});
	}
    return menuView;   
};


function getMenuButton(args){
    var v=Ti.UI.createView({
        height: args.h,
        width: args.w,
        backgroundColor: 'white'
    });
    
    var b=Ti.UI.createView({
        height: "20dp",
        width: "20dp",
        backgroundImage: "/Menu-25.png"
    });
    
    v.add(b);
    return v;
};

$.drawermenu.init({
   menuview: getMenuView().getView(),
   mainview: createView('ListBookings').getView(),
   duration:200,
   parent: $.home
});

$.home.open();

if (!OS_IOS) {
	$.home.addEventListener('android:back',function (e){
	var dialog = Ti.UI.createAlertDialog({
	      cancel: 1,
	      buttonNames: [L("CONFIRM"),L("CANCEL")],
	      message: L("EXIT_THE_APP"),
	      title: L("CONFIRM_EXIT")
	    });
	dialog.addEventListener('click', function(e){
	      Ti.API.info('home: e.cancel: ' + e.cancel);
	      Ti.API.info('home: e.source.cancel: ' + e.source.cancel);
	      Ti.API.info('home: e.index: ' + e.index);
	      if (e.index == e.source.cancel){
	          Ti.API.info('home: l utente non conferma uscita da APP');
	      }else {
              $.home.close();
              Ti.API.info('home: l utente conferma uscita da APP. Reset della cache..');
	          
	      }
	      
	    });
	    dialog.show();
   });
}