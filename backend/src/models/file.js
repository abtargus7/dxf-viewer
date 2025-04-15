'use strict';
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/dbConnection.js";
import block from "./block.js";

const file =  sequelize.define(
  'file',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    fileName: {
      type: DataTypes.STRING
    },
    fileType: {
      type: DataTypes.STRING
    },
    size: {
      type: DataTypes.INTEGER
    },
    path: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  },
  {
    freezeTableName: true,
    modelName: 'file'
  })

file.hasMany(block, {foreignKey: 'fileId'})
block.belongsTo(file, {foreignKey: "fileId"})

export default file