import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from '../utils/ApiError.js'
import fs from 'fs'
import DxfParser from "dxf-parser"
import File from '../models/file.js'
import Block from "../models/block.js"
import Entity from '../models/entity.js'
import { ApiResponse } from "../utils/ApiResponse.js"

//controller to upload file and insert data in db
const uploadCAD = asyncHandler(async (req, res) => {

    //check if file recieved
    if (!req.file) throw new ApiError(400, "File upload Failed: No file was recieved")
    console.log(req.file)

    //parse and read file 
    const parser = new DxfParser()
    const dxfContent = fs.readFileSync(req.file.path, 'utf-8')
    const parsed = parser.parseSync(dxfContent)

    //get data from req.file
    const { filename, mimetype, path, size } = req.file


    try {
        //create transaction
        const transaction = await File.sequelize.transaction()

        //store file info into db
        const createFile = await File.create({
            fileName: filename,
            fileType: mimetype,
            size,
            path,
        }, { transaction })

        //check if file inserted in db
        if (!createFile) throw new ApiError(400, "Failed to insert file into database")



        //loop through block
        const blockEntries = Object.entries(parsed.blocks || {})

        for (const [blockName, blockData] of blockEntries) {

            //store blocks into db using loop
            const createBlock = await Block.create({
                name: blockName,
                positionX: blockData.position?.x,
                positionY: blockData.position?.y,
                positionZ: blockData.position?.z,
                handle: blockData?.handle,
                ownerHandle: blockData?.ownerHandle,
                name2: blockData?.name2,
                xrefPath: blockData.xrefPath,
                fileId: createFile.dataValues.id
            }, { transaction })

            // check if block is inserted in db
            if (!createBlock) throw new ApiError(400, "Failed to insert Block into batabase")

            //prepare entities for bulk insert
            let entityData = []

            //loop through entities in a block
            for (const entity of blockData.entities || []) {
                let coords = {}

                switch (entity.type) {
                    case 'LINE':
                        coords = {
                            x1: entity.start?.x,
                            y1: entity.start?.y,
                            z1: entity.start?.z,
                            x2: entity.end?.x,
                            y2: entity.end?.y,
                            z2: entity.end?.z,
                        }
                        break

                    case 'CIRCLE':
                        coords = {
                            centerX: entity.center?.x,
                            centerY: entity.center?.y,
                            centerZ: entity.center?.z,
                            radius: entity.radius,
                        };
                        break;

                    case 'ARC':
                        coords = {
                            centerX: entity.center?.x,
                            centerY: entity.center?.y,
                            radius: entity.radius,
                            startAngle: entity.startAngle,
                            endAngle: entity.endAngle,
                        };
                        break;

                    case 'LWPOLYLINE':
                        coords = {
                            vertices: JSON.stringify(entity.vertices || []),
                            isClosed: entity.shape || false,
                        };
                        break;

                    case 'SPLINE':
                        coords = {
                            degree: entity.degree,
                            controlPoints: JSON.stringify(entity.controlPoints || []),
                            knotValues: JSON.stringify(entity.knots || []),
                            isPlanar: entity.planar,
                        };
                        break;

                    default:
                        coords = {
                            rawData: JSON.stringify(entity),
                        };
                }

                //push prepared entity data
                entityData.push({
                    type: entity?.type,
                    blockId: createBlock.dataValues.id,
                    coOrdinates: coords,
                    handle: entity?.handle,
                    ownerHandle: entity?.ownerHandle,
                    color: entity?.color,
                    colorIndex: entity?.colorIndex,
                    shape: entity?.shape,
                    normalVector: entity?.normalVector,
                    degreeOfSplineCurve: entity?.degreeOfSplineCurve
                })

                //bulk insert enities for this block
                const createEntity = await Entity.bulkCreate(entityData, { transaction })

                //check if entities inserted in db
                if (!createEntity) throw new ApiError(400, "Failed to insert entities into database")

            }
        }

        //commit transaction
        await transaction.commit();
        console.log('File, blocks, and entities saved successfully.');

        // send response
        return res.status(201).json(new ApiResponse(201, "File parsed and data inserted successfully"))

    } catch (error) {
        transaction.rollback();
        console.error('Transaction failed:', error);
    }
})

//controller to retrieve info of all filess
const retrieveAllFiles = asyncHandler(async (req, res) => {

    //retrieve all files from db
    const allFiles = await File.findAll()

    //check if files retrieved
    if (!allFiles) throw new ApiError(404, "File not found")

    //send all files 
    return res.status(200).json(new ApiResponse(200, allFiles, "All files retrieved successfully"))
})

//controller to retrieve file info using id
const retrieveFileById = asyncHandler(async(req, res) => {
    const id = req.params.id

    //retrieve file by using id
    const getFile = await File.findByPk(id)

    //check if file received
    if(!getFile) throw new ApiError(404, "File not found")
    
    //send file
    return res.status(200).json(new ApiResponse(200, getFile, "Retrieved File Successfully"))
})

export { uploadCAD, retrieveAllFiles, retrieveFileById}