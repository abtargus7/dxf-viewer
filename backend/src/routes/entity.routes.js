import { Router } from "express";
import { retrieveEntitiesByBlockId, retrieveEntityById } from "../controllers/entity.controller.js";

const router = Router()

router.route('/:id').get(retrieveEntitiesByBlockId)
router.route('/entity/:id').get(retrieveEntityById)


export default router