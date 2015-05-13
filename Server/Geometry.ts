export function GetDistance(p1: Vector2D, p2: Vector2D): number {
    var vx = p1.x - p2.x;
    var vy = p1.y - p2.y;

    return Math.sqrt((vx * vx) + (vy * vy));
}

export function GetRotationFromV(v: Vector2D) {
    var radians = Math.atan2(v.y, v.x);
    var angle = (radians > 0 ? radians : (2 * Math.PI + radians)) * 360 / (2 * Math.PI);
    console.log(angle);
    if (angle >= 315 || angle <= 45) { return Rotation.Left };
    if (angle > 45 && angle < 135) { return Rotation.Top };
    if (angle >= 135 && angle <= 225) { return Rotation.Right };
    if (angle > 225 && angle < 315) { return Rotation.Down; }

}