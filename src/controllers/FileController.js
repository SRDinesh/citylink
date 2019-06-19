import Boom from 'boom';
import ErrorHelper from '../helpers/ErrorHelper';
import Fs from 'fs';
import Csv from 'csv';

class FileController {
    constructor() { }

    static async readFile(req, res) {
        try {
            let result = [];
            let readStream = Fs.createReadStream("./public/sample.csv");
            let writeStream = Fs.createWriteStream("./public/output.csv");
            let csvStream = Csv.parse();
            csvStream.on("data", (data)=> {
                let datajson = JSON.stringify(data);
                let newCsv = datajson.split('\n').map((line)=> {
                    let columns = line.split(','); // get the columns
                    columns.splice(2, 1); // remove unused column
                    return columns;
                }).join('\n').toString();
                console.log(newCsv);
                // result.push(newCsv);
                
                writeStream.write(newCsv);
            }).on("end", ()=> {
                console.log("done");
            }).on("error", (error)=> {
                console.log(error)
            });
            readStream.pipe(csvStream);
        } catch (err) {
            ErrorHelper.handleError(err);
        }
    }

}

export default FileController;