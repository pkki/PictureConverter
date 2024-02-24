const express = require('express');
fs = require('fs');
ejs = require('ejs');
multer = require('multer')
sharp = require("sharp");
gm = require('gm');
fileType = require('file-type')
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var listener = app.listen(3540, function () {

    console.log(listener.address().port);

});
const index_page = fs.readFileSync('./views/index.ejs', 'utf8');
const post_page = fs.readFileSync("./views/post.ejs", "utf-8")
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 15 * 1024 * 1024, // 最大ファイルサイズは15MB
    },

});
app.use(express.static('public'));

app.get('/', function (request, response) {
    var content = ejs.render(index_page, {
    });
    response.send(content);
});
app.get('/style.css', function (request, response) {
    response.sendFile(__dirname + '/views/style.css');
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
function convertImage(inputBuffer) {
    return new Promise((resolve, reject) => {
        gm(inputBuffer)
            .noProfile()
            .toBuffer('PNG', function (err, buffer) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(buffer);
            });
    });
}
function convertImage2(inputBuffer, type) {
    return new Promise((resolve, reject) => {
        gm(inputBuffer)
            .noProfile()
            .toBuffer(type, function (err, buffer) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(buffer);
            });
    });
}
app.post('/post.html', upload.single('file'), async function (request, response) { // asyncを追加
    console.log(request.body);
    if (!request.file) {
        return response.status(400).send('ファイルなし');
    }
    const mimeTypes = {
        'avif': 'avif',
        'tiff': 'tiff',
        'svg': 'svg+xml',
        'jpg': 'jpeg',
        "png": "png",
        "webp": "webp",
        "gif": "gif",
        "ico": "ico"
    };

    async function convertAndSendFile(extension, quality, width, height, resize) {
        const mimeType = mimeTypes[extension];
        let outputBuffer;
        let output2Buffer;
        if (resize == "true") {

        } else {
            width = null;
            height = null;
        }
        const result = await fileType.fromBuffer(request.file.buffer);
        if (result.ext === 'ico') {
            output2Buffer = await new Promise((resolve, reject) => {
                gm(request.file.buffer)
                    .noProfile()
                    .toBuffer('PNG', function (err, buffer) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(buffer);
                        }
                    });
            });
        } else {
            output2Buffer = request.file.buffer;
        }
        if (extension == "jpg") {
            if (quality <= 100 && quality >= 1) {
                outputBuffer = await sharp(output2Buffer).jpeg({
                    quality: quality,
                    progressive: true
                }).resize(width, height).toBuffer();
            }
        } else if (extension == "png") {
            if (quality <= 9 && quality >= 1) {
                outputBuffer = await sharp(output2Buffer).png({
                    compressionLevel: quality,
                    progressive: true
                }).resize(width, height).toBuffer();
            }
        } else if (extension == "webp") {
            if (quality <= 100 && quality >= 1) {
                outputBuffer = await sharp(output2Buffer).webp({
                    quality: quality
                }).resize(width, height).toBuffer();
            }
        } else if (extension == "tiff") {
            if (quality <= 100 && quality >= 1) {
                outputBuffer = await sharp(output2Buffer).tiff({
                    quality: quality
                }).resize(width, height).toBuffer();
            }
        } else if (extension == "ico") {
            convertImage2(request.file.buffer, "ICON")
                .then(buffer => {
                    // ここでbufferを使用します。bufferは、変換後の画像データを含んでいます。
                    outputBuffer = buffer;
                })
                .catch(err => {
                    console.error(err);
                });
        } else {
            outputBuffer = await sharp(output2Buffer).resize(width, height).toBuffer();
        }
        let base64Image = outputBuffer.toString('base64');
        const pic = `data:image/${mimeType};base64,${base64Image}`;
        response.send(pic);
        try {
            await fs.promises.unlink(request.file.path);
        } catch (err) {
            console.error(`Error removing files: ${err}`);
        }
    }

    if (request.body["kakutyousi"] in mimeTypes) {
        await convertAndSendFile(request.body["kakutyousi"], Number(request.body["quality"]), Number(request.body["width"]), Number(request.body["height"]), request.body["resize"]);
    }

});