const express = require("express");
const { register, login, getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/user.controller");
const authenticator = require("../middlewares/authenticator");
const validator = require("../middlewares/validator");
const userLogger = require("../middlewares/userLogger");

const router = express.Router();

router.post("/signup", register);
router.post("/login", login, userLogger);

router.get("/users", authenticator, getAllUsers);
router.get("/users/:id", authenticator, getUserById);
router.patch("/users/:id", authenticator, validator, updateUser);
router.delete("/users/:id", authenticator, validator, deleteUser);

module.exports = router;
