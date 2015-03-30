
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
 