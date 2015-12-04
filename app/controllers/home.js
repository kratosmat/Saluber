//var controls=require(WPATH('controls'));
//var gps = require("geo");
var args = arguments[0];

// get main and menu view as objects
var menuView;
var mainView;

var activeView = 1;

function getListBookingsView(){
	view = Alloy.createController('ListBookings');
	view.menuButton.add(getMenuButton({
		h: '60',
	    w: '60'
	 }));
	 view.menuButton.addEventListener('click',function(){
		$.drawermenu.showhidemenu();
	    $.drawermenu.menuOpen=!$.drawermenu.menuOpen;
	 }); 
	return view;
};

function getBookingsView(){
	Ti.API.info("getBookingsView ");
	 view = Alloy.createController("Booking");
	 view.menuButton.add(getMenuButton({
	    h: '60',
	    w: '60'
	 }));
	 view.menuButton.addEventListener('click',function(){
		$.drawermenu.showhidemenu();
	    $.drawermenu.menuOpen=!$.drawermenu.menuOpen;
	 }); 
    return view;
};

function getUserProileView() {
	Ti.API.info("home: getUserProileView ");
	view = Alloy.createController("UserProfile");
	view.menuButton.add(getMenuButton({
	    h: '60',
	    w: '60'
	 }));
	view.menuButton.addEventListener('click',function(){
		$.drawermenu.showhidemenu();
	    $.drawermenu.menuOpen=!$.drawermenu.menuOpen;
	 }); 
    return view;
};

function getCalendarView() {
	Ti.API.info("home: getCalendarView ");
	view = Alloy.createController("Calendar");
	view.menuButton.add(getMenuButton({
	    h: '60',
	    w: '60'
	 }));
	view.menuButton.addEventListener('click',function(){
		$.drawermenu.showhidemenu();
	    $.drawermenu.menuOpen=!$.drawermenu.menuOpen;
	 }); 
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
		            $.drawermenu.drawermainview.add(getListBookingsView().getView());
		            //getListBookingsView().reloadMap();
		        }
				activeView = 1;
		    }
		    if(e.rowData.id==="row2"){
		        if(activeView!=2){
		        	$.drawermenu.drawermainview.removeAllChildren();
		            $.drawermenu.drawermainview.add(getBookingsView().getView());
		        } 
		        activeView = 2;
		    }
		    if(e.rowData.id==="row3"){
				if(activeView!=3){
	        	    $.drawermenu.drawermainview.removeAllChildren();
	                $.drawermenu.drawermainview.add(getUserProileView().getView());
	            }
		        activeView = 3;
		    }
		    if(e.rowData.id==="row4"){
				if(activeView!=4){
	        	    $.drawermenu.drawermainview.removeAllChildren();
	                $.drawermenu.drawermainview.add(getCalendarView().getView());
	            }
		        activeView = 4;
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
        backgroundColor: '#A1D0E0'
    });
    
    var b=Ti.UI.createView({
        height: "20dp",
        width: "20dp",
        backgroundImage: "/106-sliders.png"
    });
    
    v.add(b);
    return v;
};

$.drawermenu.init({
   menuview: getMenuView().getView(),
   mainview: getListBookingsView().getView(),
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