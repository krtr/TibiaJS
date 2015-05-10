class TextDisplayer {

    private textList = new Array< { txtObj: any; pos: Vector2D; startTime: number; durationTime: number; movingVector: { x: number; y: number; } }>();
    private spriteDrawer: SpriteDrawer;
    constructor(spriteDrawer: SpriteDrawer) {
        this.spriteDrawer = spriteDrawer;
    }
	AddTxt(str: string, color: string, position: Vector2D) {
		this.textList.push({
			txtObj: this.spriteDrawer.renderer.PrepareTxt(str, color, 12, true), pos: { x: position.x, y: position.y },
			startTime: Date.now(), durationTime: 5000, movingVector: { x: 0, y: 0 }
		});
	}

	AddMovingTxt(str: string, color: string, position: Vector2D, movingV: Vector2D) {
		this.textList.push({
            txtObj: this.spriteDrawer.renderer.PrepareTxt(str, color, 12, true), pos: { x: position.x, y: position.y },
			startTime: Date.now(), durationTime: 750, movingVector: { x: movingV.x, y: movingV.y }
		});
	}

    Render(spriteDrawer: SpriteDrawer, FPS: number) {
		var curTime = Date.now();
		for (var i = 0; i < this.textList.length; i++) {
			if (curTime > this.textList[i].startTime + this.textList[i].durationTime) {
				this.textList.splice(i, 1);
				i--;
				continue;
			}
			this.textList[i].pos.x += this.textList[i].movingVector.x / FPS;
			this.textList[i].pos.y += this.textList[i].movingVector.y / FPS;
            this.spriteDrawer.renderer.DrawTxt(this.textList[i].txtObj, this.textList[i].pos.x, this.textList[i].pos.y);
		}
	}

} 