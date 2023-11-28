const express = require("express");
const { register, login, resetpassword, forgotpassword, getProfile } = require("../controllers/auth");
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/forgotpassword", forgotpassword);

router.put("/resetpassword/:resetPasswordToken", resetpassword);

router.get("/getprofile", getProfile);

module.exports = router;