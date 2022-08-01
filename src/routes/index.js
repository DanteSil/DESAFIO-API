const { Router } = require("express");

const userRouter = require("./users.routes");
const notesRouter = require("./notes.routes");
const tagsRouter = require("./tags.router")

const routes = Router();

routes.use("/users", userRouter);
routes.use("/tags", tagsRouter);
routes.use("/notes", notesRouter);

module.exports = routes;
 