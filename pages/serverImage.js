const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const fileUpload = require("express-fileupload");
const mysql = require("mysql");
const { v4: uuidv4 } = require("uuid");
const PORT = 3000;

app.use(fileUpload());

app.use(express.static("upload"));

//第一引数に ポート番号を指定して、第二引数にコールバック関数を指定してローカルサーバーと接続する。
app.listen(PORT, () => console.log("running on server🚀"));

//express-handlebarsを使用する。
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// データベースに接続する。
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    database: "image-uploader-yt",
    password: "root",
});

//データベースから画像ファイルを取得する。
app.get("/", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("DBと接続中・・・🌳");

        connection.query("SELECT * FROM image", (err, rows) => {
            connection.release();
            console.log(rows);
            if (!err) {
                res.render("home", { layout: false, rows });
            }
        });
    });
});

//画像ファイルをアップロードする。
app.post("/", (req, res) => {
    let sampleFile;
    let uploadPath;

    if (!req.files) {
        return res.status(400).send("何も画像がアップロードされていません");
    }

    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + "/upload/" + sampleFile.name;
    console.log(sampleFile);

    //uploadディレクトリにファイルを保存する。
    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);

        // res.send("ファイルをアップロードしました！");

        //MySQLに画像ファイルの名前を追加して保存する。  
        pool.getConnection((err, connection) => {
            if (err) throw err;

            console.log("DBと接続中・・・🌳");

            connection.query(
                `insert into image values ('${uuidv4()}', 'text','${sampleFile.name
                }','text','text');`,
                (err, rows) => {
                    connection.release();
                    if (!err) {
                        res.redirect("/");
                    } else {
                        console.log(err);
                    }
                }
            );
        });
    });
});

