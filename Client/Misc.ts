
function GET(path: string, fn: (err, res) => void) {
	var req = new XMLHttpRequest();
	req.open("GET", path, true);
	req.send();

	req.onreadystatechange = function () {
		if (req.readyState == 4 && req.status == 200) {
			fn(null, req.responseText);
		} else if (req.readyState == 4) {
			var err = req.response;
			fn(err, "");
		}
	}
}
 
var _lastmeasure = Date.now();
function GetFPS(): number {
	var curmeasure = Date.now();
	var delta = curmeasure - _lastmeasure;
	_lastmeasure = curmeasure;
	return 1000.0 / delta;
}