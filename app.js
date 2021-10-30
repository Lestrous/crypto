export default (express, bodyParser, createReadStream, crypto, http, fs, Busboy, inspect, busboyBodyParser) => {
    const app = express();

    const CORS = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type,Accept,Access-Control-Allow-Headers'
    };

    app
        .use(busboyBodyParser())
        .use((r, res, next) => { r.res.set(CORS); next(); })
        // .use(bodyParser.urlencoded({ extended: true }))
        // .use(bodyParser.json())

        .post('/', (req, res) => {
            // let busboy = new Busboy({headers: req.headers});
            //
            // busboy.on('field', (fieldname, val) => {
            //     console.log(fieldname + ': ' + inspect(val));
            // });

            // req.pipe(busboy);

            // console.log(req.body);
            // console.log(req.body.key);
            // console.log(req.body.secret);


            const key = req.files.key;
            const secret = req.files.secret;

            // console.log(req.body);
            // console.log(req.body.key);
            // console.log(req.body.secret);
            // console.log(req.files);
            // console.log(key);
            // console.log(secret);

            let buffer = Buffer.from(secret.data, "base64");
            let bufferKey = Buffer.from(key.data, "base64");
            let decrypted = crypto.privateDecrypt(bufferKey, buffer);

            res.send(decrypted.toString("utf8"));

            // res.send();

            // if (req.body) {
            //     const key = req.body.key;
            //     const secret = req.body.secret;
            //
            //     if (key && secret) {
            //         let buffer = Buffer.from(secret, "base64");
            //         let decrypted = crypto.privateDecrypt(key, buffer);
            //
            //         res.send(decrypted.toString("utf8"));
            //     } else {
            //         res.send();
            //     }
            // } else {
            //     res.send();
            // }


            // console.log(key);
            // console.log(secret);
            //
            // const keyName = 'id_rsa2';
            // const messageName = 'secret2';
            //
            // let absolutePath = './' + keyName;
            // let privateKey = fs.readFileSync(absolutePath);
            //
            // let absolutePathMessage = './' + messageName;
            // let privateMessage = fs.readFileSync(absolutePathMessage);
            //
            // let buffer = Buffer.from(privateMessage, "base64");
            // let decrypted = crypto.privateDecrypt(privateKey, buffer);
            //
            // res.send(decrypted.toString("utf8"));
        })
        .get('/login/', (req, res) => res
            .send('Штоль')
        );

    return app;
}
