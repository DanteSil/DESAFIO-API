const { Router } = require("express");

const MovieNotesController = require("../controller/MovieNotesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const notesRoutes = Router();

const movieNotesController = new MovieNotesController();

notesRoutes.use(ensureAuthenticated)

notesRoutes.post("/", movieNotesController.create);
notesRoutes.get("/:id", movieNotesController.show);
notesRoutes.get("/", movieNotesController.index);
notesRoutes.delete("/:id", movieNotesController.delete);
 
module.exports = notesRoutes;
