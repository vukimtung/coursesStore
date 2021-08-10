const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
// const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { response } = require("express");
const port = process.env.PORT || 3000;
mongoose.connect(
  "mongodb+srv://dbElearning:vukimtung@cluster0.ckiv7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true  }
);
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//upload image
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });
app.post("/uploads", upload.single("image"), (req, res) => {
  console.log(req.file.filename);
  res.send("Upload success");
});

// app.post("/uploads", upload.single("image"), (req, res) => {
//   let token = req.body.id;
//   const newImage = new User({
//     image: file.originalname
//   });
//   jwt.verify(token, "secretkey", (err, decoded) => {
//     if (err)
//       return res.status(401).json({
//         error: err
//       });
//     User.findOne({ _id: decoded.userId }, (err, user) => {
//       if (err) {
//         return console.log(err);
//       } else {
//         newImage.save(err => {
//           if (err) {
//             return res.status(400).json({
//               err
//             });
//           }
//           return res.status(201).json({});
//         });
//       }
//     });
//   });
// });
//end eupload image

app.get("/alluser", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});
// Đăng ký tài khoản
app.post("/register", (req, res, next) => {
  const newUser = new User({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
    // password: bcrypt.hashSync(req.body.password, 10) mã hóa mật khẩu bằng bcrypt
  });
  User.findOne({$or: [{ username: req.body.username}, {email: req.body.email }]}, (err, user) => {
    if (user) {
      return res.status(409).json({
        message: "Username/Email already exists"
      });
    } else {
      newUser.save(err => {
        if (err) {
          return res.status(400).json({
            err
          });
        }
        return res.status(201).json({});
      });
    }
    if (err) {
      return res.status(500).json({
        err
      });
    }
  });
});
// Đăng nhập
app.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err)
      return res.status(500).json({
        error: err
      });
    if (!user) {
      return response.status(401).json({
        error: err
      });
    }
    if (req.body.password != user.password) {
      return res.status(401).json({
        error: "Error"
      });
    }
    //  Tạo token
    let token = jwt.sign({ userId: user._id }, "secretkey");
    console.log(user)
    return res.status(200).json({
      token: token,
      user
    });
  });
});
//Lấy dữ liệu user
app.get("/user", (req, res, next) => {
  let token = req.headers.token;
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        error: err
      });
    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err);
      return res.status(200).json({
        user: {
          id: user.userId,
          email: user.email,
          password: user.password,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          phone: user.phone,
          role: user.role,
          registiondate: user.registiondate
        }
      });
    });
  });
});
// update profile user
app.put("/update", async (req, res) => {
  let token = req.body.id;
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        error: err
      });
    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) {
        return console.log(err);
      } else {
        User.updateOne({ _id: decoded.userId }, req.body, function(err, user) {
          if (err) {
            console.log(err);
          } else {
            console.log("Update Success");
            user;
          }
        });
      }
    });
  });
});

// update role
app.put("/updaterole", async (req, res) => {
  let token = req.body.id;
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        error: err
      });
    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) {
        return console.log(err);
      } else {
        User.updateOne({ _id: decoded.userId }, req.body, function(err, user) {
          if (err) {
            console.log(err);
          } else {
            console.log("Update Role Success");
            user;
          }
        });
      }
    });
  });
});

app.listen(port, err => {
  if (err) return console.log(err);
  console.log(`Server chạy trên http://localhost:${port}`);
});
