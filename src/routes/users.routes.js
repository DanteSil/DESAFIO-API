const { Router } = require("express");

const UserController = require("../controller/usersController");

const usersRoutes = Router();

const userController = new UserController();

usersRoutes.post("/", userController.create);
usersRoutes.put("/:id",  userController.upDate);
 
module.exports = usersRoutes;
