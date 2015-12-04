/*--------------------------------------------------------
* Initialization.
*-------------------------------------------------------*/
var args = arguments[0] || {};
var outerView = args.outerView;

// Placeholder for picker data.
var pickerData = [];

// Placeholder for keeping track of key/value pairs.
//var pickerValueArray = [];

// For single-picker columns on Android, use an option dialog.
var androidSpecificTypes = ['single-column'];
var androidSpecific = (OS_ANDROID && _.contains(androidSpecificTypes, args.type));

// Placeholder elements.
var pickerView;
var picker;
var optionsDialog;



/*--------------------------------------------------------
* Initialization.
*-------------------------------------------------------*/

// On iOS, hide the nav bar if requested.
if (OS_IOS && args.hideNavBar === true) {
  outerView.hideNavBar();
}

// If specific UI elements are used on Android, don't create picker views.
if (androidSpecific) {
  switch (args.type) {
  case 'single-column':
    // Use option dialog for single-column pickers on Android.
    populateOptionsDialog();
    break;
  }
}
else {
  var overlay = Widget.createController('overlay').getView();
  // Create the controller for the picker view.
  // Pass callback functions to controller.
  var pickerController = Widget.createController('pickerView', {
    type: args.type,
    pickerParams: args.pickerParams,
    parentFunctions: {
      close: close,
      done: done
    }
  });
  pickerView = pickerController.getView('pickerView');
  picker = pickerController.getView('picker');
  if(OS_ANDROID) {
  	pickerTime = pickerController.getView('pickerTime');  	
  }
  outerView.add(overlay);
  outerView.add(pickerView);

  // Populate picker.
  populatePicker();
}



/*--------------------------------------------------------
* Function.
*-------------------------------------------------------*/

/**
* Generate and populate the optionsDialog.
*/
function populateOptionsDialog() {
  var selectedIndex = undefined;
	
  _.each(args.pickerValues, function(row){
    	pickerData.push(String(row.value));
  });

  // Determine the selected index.
  if (_.isArray(args.selectedValues) && !_.isEmpty(args.selectedValues)) {
    selectedIndex = getIndexFromId(args.pickerValues, args.selectedValues[0]);    
  }
  if(selectedIndex == null || selectedIndex == undefined) selectedIndex = 0;

  // Create an options dialog.
  optionsDialog = Ti.UI.createOptionDialog({
    options: pickerData,
    buttonNames: ['Cancel'],
    selectedIndex: selectedIndex
  });
  optionsDialog.show();
  optionsDialog.addEventListener('click', done);
}

/**
* Populate the picker with data.
*/
function populatePicker() {
  switch (args.type) {
  case 'single-column':
    _.each(args.pickerValues, function(row){
    	var pickerRow = Ti.UI.createPickerRow({
        	title: String(row.value)
      	});
      	pickerData.push(pickerRow);
  	});

    // Add the picker data to the picker.
    picker.add(pickerData);

    if (_.isArray(args.selectedValues) && !_.isEmpty(args.selectedValues)) {
    	var rowIndex = getIndexFromId(args.pickerValues, args.selectedValues[0]);
    	picker.setSelectedRow(0, rowIndex, false);
  	}
  
    break;

  case 'age-range':
    // Set defaults for age range.
    args.pickerParams = args.pickerParams || {};
    args.pickerParams.min = args.pickerParams.min || 18;
    args.pickerParams.max = args.pickerParams.max || 100;

    var minAge = args.pickerParams.min;
    var maxAge = args.pickerParams.max;

    // Create 2 picker columns.
    var columnParams = {width: (OS_ANDROID) ? 100 : undefined};
    var pickerColumns = [Ti.UI.createPickerColumn(columnParams), Ti.UI.createPickerColumn(columnParams)];

    // Create an array with all ages.
    var agesArray = _.range(minAge, (maxAge + 1), 1);

    // Fill each column with the full age range.
    _.each(pickerColumns, function(column, index) {
      _.each(agesArray, function(age) {
        pickerColumns[index].addRow(Ti.UI.createPickerRow({
          title: String(age)
        }));
      });
    });

    // Set columns data.
    picker.setColumns(pickerColumns);

    // On iOS, reload columns to ensure they show up correctly.
    if (OS_IOS) {
      _.each(pickerColumns, function(column) {
        picker.reloadColumn(column);
      });
    }

    // Set the defaults.
    if (_.isArray(args.selectedValues) && !_.isEmpty(args.selectedValues)) {
      _.each(args.selectedValues, function(value, columnIndex) {
        var rowIndex = _.indexOf(agesArray, Number(value));
        picker.setSelectedRow(columnIndex, rowIndex, false);
      });
    }
    break;

  case 'date-picker':
    // On Android, the picker type can't bet set after
    // the picker is created.
    // On iOS, the picker type can be set after the picker
    // is created. On iOS 8+, there are intermittent issues
    // if the picker type is set after the picker is created.
    // @see https://github.com/danielhanold/danielhanold.pickerwidget/issues/8
    //
    // To circumvent both issues, set values on creation.
    // See pickerView.js
    break;
  }
}

/**
* Get the value from a selected row.
*
* @param index
*   Index for the picker column. Defaults to 0.
*/
function getSelectedRowTitle(index) {
  index = index || 0;
  return picker.getSelectedRow(index).title;
}

function getExtraFromValue(list, value) {
  list = list || [];
  value = value || null;
  var extra = null;

  // Determine key.
  _.each(list, function(row) {
  	Ti.API.debug("picker row.value "+row.value+" value "+value);
    if (value == String(row.value)) {
      extra = row.extra;
      Ti.API.debug("picker trovato "+row.value);
      return;
    }
  });

  return extra;
}

function getIndexFromId(list, id) {
  list = list || [];
  id = id || null;
  var rowIndex = null;

  // Determine index.
  _.each(list, function(row, index) {
    if (String(row.id) == id) {
      rowIndex = index;
      return;
    }
  });

  return rowIndex;
}


/**
* Get index for key from pairs.
*
*/
function getKeyIndexFromPairs(pairs, key) {
  pairs = pairs || [];
  key = key || null;
  var rowIndex = null;

  // Determine index.
  _.each(pairs, function(pair, index) {
    if (key == pair[0]) {
      rowIndex = index;
      return;
    }
  });

  return rowIndex;
}

function getIdFromValue(list, value) {
  list = list || [];
  value = value || null;
  var id = null;

  // Determine key.
  _.each(list, function(row) {
    if (value == String(row.value)) {
      id = row.id;
      return;
    }
  });

  return id;
}

/**
* Determine the the key of the pair in this array.
*
* @param pairs
*   Array of pairs.
* @param title
*   Title that is currently selected.
*/
function getKeyFromPairs(pairs, title) {
  pairs = pairs || [];
  title = title || null;
  var key = null;

  // Determine key.
  _.each(pairs, function(pair) {
    if (title == pair[1]) {
      key = pair[0];
      return;
    }
  });

  return key;
}

/**
* User clicks done.
*/
function done(e) {
  // Return data.
  var data = null;

  // Boolean for cancel data.
  var cancel = false;

  switch (args.type) {
  case 'single-column':
    if (OS_IOS) {
      // Determine key and value from actual picker on iOS.
      var value = getSelectedRowTitle(0);
      var key = getIdFromValue(args.pickerValues, value);
      var extra = getExtraFromValue(args.pickerValues, value);
      var data = [{
        key: key,
        value: value,
        extra: extra
      }];
    }

    if (OS_ANDROID) {
      // Set the data from the picker on Android.
      e = e || {};
      e.source = e.source || {};
      e.source.options = e.source.options || [];

      // Determine if the user clicked cancel.
      if (e.button === true) {
        cancel = true;
      }
      else {
        var data = [{
          key: getIdFromValue(args.pickerValues, e.source.options[e.index]),
          value: e.source.options[e.index],
          extra: getExtraFromValue(args.pickerValues, e.source.options[e.index])
      
        }];
      }
    }
    break;

  case 'age-range':
    // Get the numbers.
    var numberLow = Number(picker.getSelectedRow(0).title);
    var numberHigh = Number(picker.getSelectedRow(1).title);

    // Validation: Ensure high number is higher than low.
    if (numberLow >= numberHigh) {
      var alertDialog = Ti.UI.createAlertDialog({
        title: "Error",
        message: 'Please pick a valid age range',
        buttonNames: ['Ok']
      }).show();
      return;
    }

    // Validation: If minDifference is set, ensure age
    // difference is large enough.
    if (_.isNumber(args.pickerParams.minDifference)) {
      if ((numberHigh - numberLow) < Number(args.pickerParams.minDifference)) {
        var alertDialog = Ti.UI.createAlertDialog({
          title: "Error",
          message: 'Ages must be ' + String(args.pickerParams.minDifference) + ' years apart.',
          buttonNames: ['Ok']
        }).show();
        return;
      }
    }

    // If validation is passed, set the numbers.
    data = {
      low: numberLow,
      high: numberHigh
    };
    break;

  case 'date-picker':
    // Determine the selected date.
    var selectedDate = picker.getValue();

    // Error checking for minimum selected date.
    if (_.isDate(args.pickerParams.maxSelectedDate) && (selectedDate > args.pickerParams.maxSelectedDate)) {
      if (_.isString(args.pickerParams.maxSelectedDateErrorMessage)) {
        var message = args.pickerParams.maxSelectedDateErrorMessage;
      }
      else {
        var message = 'The date you selected is not valid';
      }
      var alertDialog = Ti.UI.createAlertDialog({
        title: "Error",
        message: message,
        buttonNames: ['Ok']
      }).show();
      return;
    }

    // @see http://stackoverflow.com/questions/4060004/calculate-age-in-javascript
    var age = Math.floor((Date.now() - selectedDate) / (31557600000));
    var unixMilliseconds = Math.round(selectedDate.getTime());
    var unixSeconds = Math.round(selectedDate.getTime() / 1000);
    data = {
      date: selectedDate,
      age: age,
      unixMilliseconds: unixMilliseconds,
      unixSeconds: unixSeconds
    };
    break;
    
    case 'date-time-picker':
	    // Determine the selected date.
	    
	    var selectedDate = picker.getValue();
	    var selectedTime;
	    if(OS_ANDROID) selectedTime = pickerTime.getValue();
	    
	    // Error checking for minimum selected date.
	    if (_.isDate(args.pickerParams.maxSelectedDate) && (selectedDate > args.pickerParams.maxSelectedDate)) {
	      if (_.isString(args.pickerParams.maxSelectedDateErrorMessage)) {
	        var message = args.pickerParams.maxSelectedDateErrorMessage;
	      }
	      else {
	        var message = 'The date you selected is not valid';
	      }
	      var alertDialog = Ti.UI.createAlertDialog({
	        title: "Error",
	        message: message,
	        buttonNames: ['Ok']
	      }).show();
	      return;
	    }
	   var date;
	   if(OS_ANDROID) {
			date = new Date(
		    	selectedDate.getFullYear(), 
		    	selectedDate.getMonth(), 
		    	selectedDate.getDate(), 
		    	selectedTime.getHours(), 
		    	selectedTime.getMinutes(), 
		    	selectedTime.getSeconds(), 0);
	   }
	   if(OS_IOS) {
			date = new Date(
		    	selectedDate.getFullYear(), 
		    	selectedDate.getMonth(), 
		    	selectedDate.getDate(), 
		    	selectedDate.getHours(), 
		    	selectedDate.getMinutes(), 
		    	selectedDate.getSeconds(), 0); 
		    	   	
	   }
	     
	    // @see http://stackoverflow.com/questions/4060004/calculate-age-in-javascript
	    var age = Math.floor((Date.now() - selectedDate) / (31557600000));
	    var unixMilliseconds = Math.round(date.getTime());
	    var unixSeconds = Math.round(date.getTime() / 1000);
	    if(OS_ANDROID) {
			data = {
		      date: selectedDate,
		      time: selectedTime,
		      age: age,
		      unixMilliseconds: unixMilliseconds,
		      unixSeconds: unixSeconds
		    };
	    }
	    if(OS_IOS) {
			data = {
		      date: selectedDate,
		      time: selectedDate,
		      age: age,
		      unixMilliseconds: unixMilliseconds,
		      unixSeconds: unixSeconds
		    };
	    }
	break;
  }
  
  

  // Close the view.
  close({
    type: args.type,
    data: data,
    cancel: cancel
  });
}

/**
* Close the window.
*/
function close(_callbackParams) {
  _callbackParams = _callbackParams || {};
  _callbackParams.type = args.type;
  _callbackParams.id = args.id || null;
  _callbackParams.data = _callbackParams.data || null;
  _callbackParams.cancel = _callbackParams.cancel || false;

  // If the navbar was supposed to be hidden, show it again.
  if (OS_IOS && args.hideNavBar === true) {
    outerView.showNavBar();
  }

  // Execute callback function if one is set.
  if (_.isFunction(args.onDone)) {
    args.onDone(_callbackParams);
  }

  // Remove elements from views.
  if (androidSpecific === false) {
    outerView.remove(overlay);
    outerView.remove(pickerView);
  }

  // Null out elements.
  overlay = null;
  pickerView = null;
  picker = null;
  optionsDialog = null;
}