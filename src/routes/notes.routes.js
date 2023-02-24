const { Router } = require("express");

const NotesController = require("../controllers/NotesController");
const ensureAutheticated = require("../middlewares/ensureAutheticated")

const notesRoutes = Router();
const notesController = new NotesController();

notesRoutes.use(ensureAutheticated)

notesRoutes.get('/', notesController.index)
notesRoutes.post('/', notesController.create)
notesRoutes.get('/:id', notesController.show)
notesRoutes.delete("/:id", notesController.delete)

module.exports = notesRoutes;