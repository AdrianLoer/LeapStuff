$(document).ready(function() {

	gui = {
		showFingerData: false,
		showHandData: false,
		showHelperData: false,
		showFingerAngleData: true
	}

	var dataGui = new dat.GUI();
	dataGui.add(gui, "showFingerData");
	dataGui.add(gui, "showHandData");
	dataGui.add(gui, "showHelperData");
	dataGui.add(gui, "showFingerAngleData");

})
