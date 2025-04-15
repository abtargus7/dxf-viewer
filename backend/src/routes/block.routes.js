import { Router } from "express";
import { retrieveBlockById, retrieveBlocksByFileId } from "../controllers/block.controller.js";

const router = Router()

router.route('/:id').get(retrieveBlocksByFileId)
router.route('/block/:id').get(retrieveBlockById)

export default router