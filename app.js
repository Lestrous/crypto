export default (express, bodyParser, crypto, busboyBodyParser, sharp) => {
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
        .all('/makeimage/', (req, res) => {
            const widthToResize = req.query.width;
            const heightToResize = req.query.height;

            res.set({'Content-Type': 'image/png; charset=UTF-8'});

            sharp('img/black-image.png')
                .resize(parseInt(widthToResize), parseInt(heightToResize))
                .png()
                .toFile('img/black-image-resized.png', (err, info) => { res.download("img/black-image-resized.png"); });
        })
        .get('/login/', (req, res) => res
            .send('shtol.leonid')
        );

    return app;
}
