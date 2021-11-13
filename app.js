export default (express, bodyParser, crypto, busboyBodyParser, imageSize) => {
    const app = express();

    const CORS = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type,Accept,Access-Control-Allow-Headers'
    };

    app
        .use(busboyBodyParser())
        .use((r, res, next) => { r.res.set(CORS); next(); })

        .post('/', (req, res) => {
            const key = req.files.key;
            const secret = req.files.secret;

            let buffer = Buffer.from(secret.data, "base64");
            let bufferKey = Buffer.from(key.data, "base64");
            let decrypted = crypto.privateDecrypt(bufferKey, buffer);

            res.send(decrypted.toString("utf8"));
        })
        .post('/size2json/', (req, res) => {
            const imgFile = req.files.image;
            const imgObj = imageSize(imgFile.data);

            const imgWidth = imgObj.width;
            const imgHeight = imgObj.height;

            res.json({"width": imgWidth, "height": imgHeight});
        })
        .get('/login/', (req, res) => res
            .send('shtol.leonid')
        );

    return app;
}
