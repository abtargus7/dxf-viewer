import multer from "multer"
import fs from 'fs'
import path from "path"

const storage =  multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public')
    },
    filename: function(req, file, cb) {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

//file filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.dwg', '.dxf']
    const ext = path.extname(file.originalname).toLowerCase()

    if(allowedTypes.includes(ext)) {
        cb(null, true)
    } else {
        cb(new Error("Only CAD files are allowed"))
    }
}

export const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 50 * 1024 * 1024} //Size limit
})