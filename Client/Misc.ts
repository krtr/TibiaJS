
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

function GetDistance(p1: Vector2D, p2: Vector2D): number {
    var vx = p1.x - p2.x;
    var vy = p1.y - p2.y;

    return Math.sqrt((vx * vx) + (vy * vy));
}

function DrawSprite(index: number, posx: number, posy: number) {
    renderer.DrawSpr((index % 32) * 32, ((index / 32) | 0) * 32, 32, 32, posx, posy, config.TileSize, config.TileSize);
}

function DrawHealthBar(percent: number, posx: number, posy: number) {
    if (percent > 90) { renderer.DrawSpr(129, 386, 26, 4, posx, posy, 26, 4); return; }
    if (percent > 75) { renderer.DrawSpr(129, 391, 26, 4, posx, posy, 26, 4); return; }
    if (percent > 60) { renderer.DrawSpr(129, 396, 26, 4, posx, posy, 26, 4); return; }
    if (percent > 45) { renderer.DrawSpr(129, 401, 26, 4, posx, posy, 26, 4); return; }
    if (percent > 35) { renderer.DrawSpr(161, 386, 26, 4, posx, posy, 26, 4); return; }
    if (percent > 20) { renderer.DrawSpr(161, 391, 26, 4, posx, posy, 26, 4); return; }
    if (percent > 10) { renderer.DrawSpr(161, 396, 26, 4, posx, posy, 26, 4); return; }
    renderer.DrawSpr(161, 401, 26, 4, posx, posy, 26, 4);
}


