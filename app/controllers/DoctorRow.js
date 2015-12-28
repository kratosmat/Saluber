var args = arguments[0] || {};
var doctor = args._doctor;

Ti.API.info("doctorRow details: " + JSON.stringify(doctor));

$.firstRow.text = "Dr.	" + doctor.firstName + ' ' + doctor.lastName;
$.secondRow.text = "Los Angeles CA, America";
$.thirdRow.text = "Tel.:	" + doctor.phone;
$.DoctorRow.selected = false;
$.DoctorRow._info = doctor;

var currFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "images/doctor-" + doctor.id + ".png");
$.iconImgRowId.setImage(currFile);

var filter = doctor.firstName + ", " + doctor.lastName;

if(OS_IOS) $.DoctorRow.filter = filter;
else if(OS_ANDROID) $.DoctorRow.title = filter;


