const csv = require("csvtojson");
const fs = require('fs');
const { pipeline, Transform } = require('stream');
const source = fs.createReadStream('./assets/csv/nodejs-hw1-ex1.csv');
const target = fs.createWriteStream('./assets/csv/nodejs-hw1-ex1-output.txt');

const outputObj = new Transform({
    transform(chunk, encoding, callback) {
        const obj = JSON.parse(chunk.toString());
        delete obj['Amount'];
        let outputObj = Object.assign({});
        for (let [key, value] of Object.entries(obj)) {
            outputObj = {...outputObj, [key.toLowerCase()]: value};
        }
        callback(null, JSON.stringify(outputObj) + '\n');
    }
});

const startTask = () => pipeline(source, csv(), outputObj, target, (err) => {
    if (err) {
        console.error('An error occurred:', err);
        process.exitCode = 1;
    } else {
        console.log('Pipeline succeeded.');
    }
});

export default startTask;