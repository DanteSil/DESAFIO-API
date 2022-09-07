const { Router } = require("express");

const userRouter = require("./users.routes");
const movieNotesRouter = require("./movieNotes.routes");
const tagsRouter = require("./tags.routes");
const sessionRoutes = require("./sessions.routes");

const routes = Router();

routes.use("/sessions", sessionRoutes);
routes.use("/users", userRouter);
routes.use("/tags", tagsRouter);
routes.use("/notes", movieNotesRouter);

module.exports = routes;
 