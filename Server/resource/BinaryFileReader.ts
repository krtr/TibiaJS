/**
 * Created by Pawel Ruman on 15.05.2016.
 */
class BinaryFileReader {
    currentNodeTree = [];
    startNodeControlNumber = 254;
    endNodeControlNumber = 255;
    buffer = null;
    readPos = 0;
    
    constructor(buffer, readPos) {
        this.buffer = buffer;
        this.readPos = readPos;
    }
    
    startNode() {
        var controlNumber = this.readUInt8();
        if (controlNumber !== this.startNodeControlNumber)
            console.log("it is not node start", this.readPos - 1, controlNumber)

        var nodeType = this.readUInt8();
        this.currentNodeTree.push(nodeType);
        return nodeType;
    }

    isNextNodeStart() {
        return this.buffer.readUInt8(this.readPos) === this.startNodeControlNumber;
    }

    endNode() {
        var controlNumber = this.readUInt8();
        if (controlNumber !== this.endNodeControlNumber)
            console.log("it is not node end", this.readPos - 1, controlNumber)
        this.currentNodeTree.pop();
    }

    readUInt8() {
        var result = this.buffer.readUInt8(this.readPos);
        this.readPos += 1;
        return result;
    }

    readUInt16() {
        var result = this.buffer.readUInt16LE(this.readPos);
        this.readPos += 2;
        return result;
    }

    readUInt32() {
        var result = this.buffer.readUInt32LE();
        this.readPos += 4;
        return result;
    }


    isNotEnd() {
        return this.buffer.length - 8 >= this.readPos;
    }

    isNextNodeEnd() {
        return this.buffer.readUInt8(this.readPos) === this.endNodeControlNumber;
    }

    readString() {
        var stringLength = this.readUInt16();
        var str = this.buffer.slice(this.readPos, this.readPos+stringLength).toString();
        this.readPos+= stringLength
        return str;
    }

    getTopNode() {
        if (this.currentNodeTree.length === 0)
            return -1;

        return this.currentNodeTree[this.currentNodeTree.length - 1]
    }

    skip(bytes) {
        this.readPos += bytes;
    }

    skipUntilNode(nodeType) {
        var skipCount = 0;
        while(this.isNotEnd()) {
            if (this.buffer.readUInt8(this.readPos+skipCount) === this.startNodeControlNumber && this.buffer.readUInt8(this.readPos+1+skipCount) === nodeType)
                break;
            skipCount++;
        }
        //console.log(skipCount);
        this.readPos+= skipCount;
    }

}

export = BinaryFileReader;
