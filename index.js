const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user:"root",
  host:"localhost",
  password:"123456",
  database:"hw1",
});

app.post("/create", (req, res) => {
  const classname = req.body.classname;
  const classday = req.body.classday;
  const classtime = req.body.classtime;
  
  db.query(
    "INSERT INTO classname (classname, classday, classtime) VALUES (?,?,?)",
    [classname, classday, classtime,],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/classname", (req, res) => {
  db.query("SELECT * FROM classname", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const classday = req.body.classday;
  db.query(
    "UPDATE classname SET classtime = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM classname WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
