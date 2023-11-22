const express = require("express");
const { register, login, resetpassword, forgotpassword } = require("../controllers/auth");
const router = express.Router();

router.post("/register", register);

router.get("/login", login);

router.post("/forgotpassword", forgotpassword);

router.put("/resetpassword/:resetToken", resetpassword);


module.exports = router;