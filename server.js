const express = require('express');
fs = require('fs');
ejs = require('ejs');
multer = require('multer')
sharp = require("sharp");
favicon = require('favicon');
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
    };

    async function convertAndSendFile(extension, quality, width, height, resize, rotates, hanten, yokohanten,boka) {
        const mimeType = mimeTypes[extension];
        let outputBuffer;
        let output2Buffer;
        let bokasi;
       
        if(width>=5000){
            width = width/10
        }
        if(height>=5000){
            height = height/10
        }
        if(boka <= 0.3 || boka >= 100){
            bokasi = null;
        }else{
            bokasi = boka;
        }
        console.log(bokasi)
        if (resize == "true") {

        } else {
            width = null;
            height = null;
        }
        output2Buffer = request.file.buffer;
        if (extension == "jpg") {

            if (quality <= 100 && quality >= 1) {
                if (hanten == "true") {
                    if (yokohanten == "true") {
                        outputBuffer = await sharp(output2Buffer).jpeg({
                            quality: quality,
                            progressive: true
                        }).resize(width, height).rotate(rotates).flip().flop().blur(bokasi).toBuffer();
                    } else {
                        outputBuffer = await sharp(output2Buffer).jpeg({
                            quality: quality,
                            progressive: true
                        }).resize(width, height).rotate(rotates).flip().blur(bokasi).toBuffer();
                    }
                } else {
                    if (yokohanten == "true") {
                        outputBuffer = await sharp(output2Buffer).jpeg({
                            quality: quality,
                            progressive: true
                        }).resize(width, height).rotate(rotates).flop().blur(bokasi).toBuffer();
                    } else {
                        outputBuffer = await sharp(output2Buffer).jpeg({
                            quality: quality,
                            progressive: true
                        }).resize(width, height).rotate(rotates).blur(bokasi).toBuffer();
                    }
                }
            }
        } else if (extension == "png") {
            if (quality <= 9 && quality >= 1) {
                if (hanten == "true") {
                    if (yokohanten == "true") {
                        outputBuffer = await sharp(output2Buffer).png({
                            compressionLevel: quality,
                            progressive: true
                        }).resize(width, height).rotate(rotates).blur(bokasi).flip().flop().toBuffer();
                    } else {
                        outputBuffer = await sharp(output2Buffer).png({
                            compressionLevel: quality,
                            progressive: true
                        }).resize(width, height).rotate(rotates).blur(bokasi).flip().toBuffer();
                    }
                } else {
                    if (yokohanten == "true") {
                        outputBuffer = await sharp(output2Buffer).png({
                            compressionLevel: quality,
                            progressive: true
                        }).resize(width, height).rotate(rotates).blur(bokasi).flop().toBuffer();
                    } else {
                        outputBuffer = await sharp(output2Buffer).png({
                            compressionLevel: quality,
                            progressive: true
                        }).resize(width, height).rotate(rotates).blur(bokasi).toBuffer();
                    }
                }
            }
        } else if (extension == "webp") {
            if (quality <= 100 && quality >= 1) {
                if (hanten == "true") {
                    if (yokohanten == "true") {
                        outputBuffer = await sharp(output2Buffer).webp({
                            quality: quality
                        }).resize(width, height).rotate(rotates).blur(bokasi).flip().flop().toBuffer();
                    } else {
                        outputBuffer = await sharp(output2Buffer).webp({
                            quality: quality
                        }).resize(width, height).rotate(rotates).blur(bokasi).flip().toBuffer();
                    }
                } else {
                    if (yokohanten == "true") {
                        outputBuffer = await sharp(output2Buffer).webp({
                            quality: quality
                        }).resize(width, height).rotate(rotates).blur(bokasi).flop().toBuffer();
                    } else {
                        outputBuffer = await sharp(output2Buffer).webp({
                            quality: quality
                        }).resize(width, height).rotate(rotates).blur(bokasi).toBuffer();
                    }
                }
            }
        } else if (extension == "tiff") {
            if (quality <= 100 && quality >= 1) {
                if (hanten == "true") {
                    if (yokohanten == "true") {
                    outputBuffer = await sharp(output2Buffer).tiff({
                        quality: quality
                    }).resize(width, height).rotate(rotates).blur(bokasi).flip().flop().toBuffer();
                }else{
                    outputBuffer = await sharp(output2Buffer).tiff({
                        quality: quality
                    }).resize(width, height).rotate(rotates).blur(bokasi).flip().toBuffer();
                }
                } else {
                    if (yokohanten == "true") {
                    outputBuffer = await sharp(output2Buffer).tiff({
                        quality: quality
                    }).resize(width, height).rotate(rotates).blur(bokasi).flop().toBuffer();
                }else{
                    outputBuffer = await sharp(output2Buffer).tiff({
                        quality: quality
                    }).resize(width, height).rotate(rotates).blur(bokasi).toBuffer();
                }
                }
            }
        } else {
            if (hanten == "true") {
                if (yokohanten == "true") {
                outputBuffer = await sharp(output2Buffer).resize(width, height).blur(bokasi).rotate(rotate).flop().toBuffer();
                }else{
                    outputBuffer = await sharp(output2Buffer).resize(width, height).blur(bokasi).rotate(rotate).toBuffer();
                }
            } else { if (yokohanten == "true") {outputBuffer = await sharp(output2Buffer).resize(width, height).blur(bokasi).rotate(rotate).flip().flop().toBuffer();}else{outputBuffer = await sharp(output2Buffer).resize(width, height).blur(bokasi).rotate(rotate).flip().toBuffer();} }
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
        await convertAndSendFile(request.body["kakutyousi"], Number(request.body["quality"]), Number(request.body["width"]), Number(request.body["height"]), request.body["resize"], Number(request.body["rotate"]), request.body["hanten"], request.body["yokohanten"],Number(request.body["bokasi"]));
    }

});