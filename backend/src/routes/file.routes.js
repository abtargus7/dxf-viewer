import { Router } from "express";
import { upload, } from "../middlewares/multer.middleware.js";
import { retrieveAllFiles, retrieveFileById, uploadCAD } from "../controllers/file.controller.js";

const router = Router()

//upload and retrieve file
router.route('/')
    .post(upload.single("file"), uploadCAD)
    .get(retrieveAllFiles)

//retrieve file by id
router.route('/:id')
    .get(retrieveFileById)


export default router