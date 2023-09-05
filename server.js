const express = require("express");
const QrGen = require("./models/qr-code");
const mongoose = require("mongoose");
const app = express();
const QRCode = require("qrcode");

mongoose
  .connect("mongodb://127.0.0.1:27017/qrGen", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected successfully");
  })
  .catch((e) => console.error(e, "err"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const allQrCodes = await QrGen.find();
  res.render("index", { qrCodes: allQrCodes });
});

app.post("/generate", async (req, res) => {
  console.log(req.body, ">>>>>");
  const generatedCode = await QRCode.toDataURL(req.body.content);

  await QrGen.create({
    createdAt: new Date(),
    content: req.body.content,
    qrCode: generatedCode,
  });

  res.redirect("/");
});

app.listen(process.env.PORT || 5000);
