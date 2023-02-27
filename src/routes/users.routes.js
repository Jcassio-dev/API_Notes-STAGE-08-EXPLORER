const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload")


const UsersController = require("../controllers/UsersController");
const ensureAutheticated =require("../middlewares/ensureAutheticated")

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();

usersRoutes.post('/', usersController.create);
usersRoutes.put('/', ensureAutheticated, usersController.update);
usersRoutes.patch('/avatar', ensureAutheticated, upload.single("avatar"), (req, res) => {
    console.log(req.file.filename);
    res.json();
})


module.exports = usersRoutes;