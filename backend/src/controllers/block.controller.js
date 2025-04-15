import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from "../utils/ApiResponse.js"
import Block from "../models/block.js"

//retrieve all blocks from File
const retrieveBlocksByFileId =  asyncHandler(async(req, res) => {
    const fileId = req.params.id

    //db query
    const blocks = await Block.findAll({
        where: {
            fileId,
        }
    })

    //check if blocks recieved
    if(!blocks) throw new ApiError(404, "Blocks not found for this File")
    
    //send blocks in response
    return res.status(200).json(new ApiResponse(200, blocks, "Fetched all blocks from the file"))
})

const retrieveBlockById = asyncHandler(async(req, res) => {
    const blockId = req.params.id

    const block = await Block.findByPk(blockId)

    if(!block) throw new ApiError(404, "Block not found")

    res.status(200).json(new ApiResponse(200, block, "Retrieved block successfully"))
})

export {retrieveBlocksByFileId, retrieveBlockById}