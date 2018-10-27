import {Vector2D} from "../Interchange/DataStructures";

export function GET(path: string, fn: (err, res) => void) {
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

export function GetFPS(): number {
    var curmeasure = Date.now();
    var delta = curmeasure - _lastmeasure;
    _lastmeasure = curmeasure;
    return 1000.0 / delta;
}

export function GetDistance(p1: Vector2D, p2: Vector2D): number {
    var vx = p1.x - p2.x;
    var vy = p1.y - p2.y;

    return Math.sqrt((vx * vx) + (vy * vy));
}


export function loadImage(src): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
        const image = new Image();
        image.src = src;
        image.onload = () => resolve(image);
    })
}


