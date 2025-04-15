import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from "../utils/ApiResponse.js"
import Entity from "../models/entity.js"

//controller to retrieve all entities from a block
const retrieveEntitiesByBlockId = asyncHandler(async(req, res) => {
    const blockId = req.params.id

    const entities = await Entity.findAll({
        where: {
            blockId,
        }
    })

    if(!entities) throw new ApiError(404, "Entities not found for this block")

    return res.status(200).json(new ApiResponse(200, entities, "Retrieved all entities from a block"))
})

const retrieveEntityById = asyncHandler(async(req, res) => {
    const entityId = req.params.id

    const entity = await Entity.findByPk(entityId)

    if(!entity) throw new ApiError(404, "Entity not found")

    return res.status(200).json(new ApiResponse(200, entity, "Retrieved entity successfully"))
})

export {retrieveEntitiesByBlockId, retrieveEntityById}