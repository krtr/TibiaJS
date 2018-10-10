const fs = require("fs");

const dat = fs.readFileSync("./Tibia.dat");

if (dat.readInt32LE(0) !== 0x439D5A33) {
    console.log("Wrong file signature");
}

const itemsNumber = dat.readInt16LE(4);
const creaturesNumber = dat.readInt16LE(6);
const effectsNumber = dat.readInt16LE(8);
const misslesNumber = dat.readInt16LE(10);

const objectsNumber = itemsNumber + creaturesNumber + effectsNumber + misslesNumber - 100 - 1;

console.log(`items: ${itemsNumber}, creatures: ${creaturesNumber}, effects: ${effectsNumber}, missles: ${misslesNumber}`);
console.log(`total number of ids: ${objectsNumber}`);


let readIndex = 12;

const objectList = [];

for (var i = 0; i < objectsNumber; i++) {
    const {readPosition, object} = readItem(dat, readIndex);
    readIndex = readPosition;
    objectList.push(object);
}


fs.writeFileSync("dat.json", JSON.stringify(objectList, null, 3));


function readItem(dat, readPosition) {

    while (true) {
        const descriptionByte = dat.readUInt8(readPosition);
        // console.log(descriptionByte.toString(16));
        readPosition++;
        if (descriptionByte === 0xff)
            break;

    }

    const width = dat.readUInt8(readPosition);
    readPosition++;
    const height = dat.readUInt8(readPosition);
    readPosition++;

    if (width > 1 || height > 1) {
        readPosition++;
    }

    const blend = dat.readUInt8(readPosition);
    readPosition++;

    const xrepeat = dat.readUInt8(readPosition);
    readPosition++;
    const yrepeat = dat.readUInt8(readPosition);
    readPosition++;
    const zrepeat = dat.readUInt8(readPosition);
    readPosition++;
    const animations = dat.readUInt8(readPosition);
    readPosition++;


    // console.log(width, height, `blend: ${blend}, xrepeat: ${xrepeat}, yrepeat: ${yrepeat}, zrepeat: ${zrepeat}, animations: ${animations}`);
    const spritesNumber = width * height * blend * xrepeat * yrepeat * zrepeat * animations;


    const sprites = [];

    for (var i = 0; i < spritesNumber; i++) {
        sprites.push(dat.readUInt16LE(readPosition));
        readPosition += 2;
    }

    // console.log(sprites);

    return {readPosition, object: {sprites, width, height, blend, xrepeat, yrepeat, zrepeat, animations}};
}
