class TextDisplayer {

	private textList = new Array< { txtObj: any; pos: Vector2D; startTime: number}>();
	
	AddTxt(str: string, color: string, position: Vector2D) {
		this.textList.push({ txtObj: renderer.PrepareTxt(str, color, 13, true), pos: { x: position.x, y: position.y }, startTime: Date.now() });
	}

	Render() {
		var curTime = Date.now();
		for (var i = 0; i < this.textList.length; i++) {
			if (curTime > this.textList[i].startTime + 5000) { continue;}
			//continue;
			renderer.DrawTxt(this.textList[i].txtObj, this.textList[i].pos.x, this.textList[i].pos.y);
		}
	}

} 