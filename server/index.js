const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

app.use(cors());
app.use(express.json());
app.use(bodyParse.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const sqlGet = "SELECT * FROM user where 1";
  db.query(sqlGet, (err, result) => {
    res.send(result);
  });
});

app.post("/user", upload.single(""), (req, res) => {
  const CODE = req.body.CODE;
  const NOME = req.body.NOME;
  const DATA = req.body.DATA;
  const FOTO = req.body.FOTO;

  const sqlInsert = "INSERT INTO user (CODE, NOME, DATA,FOTO) VALUES (?,?,?,?)";
  db.query(sqlInsert, [CODE, NOME, DATA, FOTO], (err, result) => {
    console.log(result);
  });
});

app.delete("/delete/:ID", (req, res) => {
  const ID = req.params.ID;
  console.log(req.params);
  const sqlDelete = "DELETE FROM user WHERE ID = ?";
  db.query(sqlDelete, ID, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/update", (req, res) => {
  const ID = parseInt(req.body.ID);
  const CODE = req.body.CODE;
  const NOME = req.body.NOME;
  const DATA = req.body.DATA;
  const FOTO = req.body.FOTO;

  const sqlUpdate = `Update user SET  CODE = ? , NOME = ?, DATA = ?, FOTO = ? WHERE ID = ?`;
  db.query(sqlUpdate, [CODE, NOME, DATA, FOTO, ID], (err, result) => {
    if (err) console.log(err);
  });
});

app.listen(3030, () => {
  console.log("rodando...");
});
