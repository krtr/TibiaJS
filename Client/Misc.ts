
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


function DrawSprite(index: number, posx: number, posy: number) {
    renderer.DrawSpr((index % 32) * 32, ((index / 32) | 0) * 32, 32, 32, posx, posy, config.TileSize, config.TileSize);
}

function DrawHealthBar(percent: number, posx: number, posy: number) {
    renderer.DrawSpr(129, 386, 26, 4, posx, posy, 26, 4);
}


