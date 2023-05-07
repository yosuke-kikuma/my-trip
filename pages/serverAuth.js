const express = require("express");
const app = express();
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const post = require("./routes/post");
const PORT = 3000;
// const asiaOceania = require("./routes/asiaOceania");

app.use(express.json());
app.use("/auth", auth);
app.use("/posts", post);
// app.use("/asiaOceania", asiaOceania);

app.get("/", (req, res) => {
    res.send("getを受け取ったよ");
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

mongoose
    .connect(
        "mongodb+srv://yosuke:abc@cluster0.qowvkvy.mongodb.net/user",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log("データベース接続中・・・");
    })
    .catch((error) => console.log(error));
