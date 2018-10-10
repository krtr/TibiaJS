const fs = require("fs");
const otbm2json = require('otbm2json');
const _ = require("lodash");
const parsedMap = otbm2json.read("./testmap.otbm");

const server_client_id = new Map(require('./server-client-ids'));

// console.log(parsedMap.data.nodes[0].features);
const size = parsedMap.data.mapWidth * parsedMap.data.mapHeight;
console.log(size);
const mapData = [];


for (var i = 0; i < size; i++) {
    const x = i % parsedMap.data.mapWidth;
    const y = Math.floor(i / parsedMap.data.mapWidth);

    const found = _.find(parsedMap.data.nodes[0].features[0].tiles, {x, y});


    if (found) {
        const field = [server_client_id.get(found.tileid)];

        if (found.items) {
            field.push(...found.items.map(item => server_client_id.get(item.id)));
        }
        mapData.push(field);

    } else {
        mapData.push([]);
    }
}


fs.writeFileSync('./map.json', JSON.stringify(mapData, null, 3));