'use strict';
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/dbConnection.js";
import entity from "./entity.js";

const block = sequelize.define(
  'block',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING
    },
    positionX: {
      type: DataTypes.FLOAT
    },
    positionY: {
      type: DataTypes.FLOAT
    },
    positionZ: {
      type: DataTypes.FLOAT
    },
    handle: {
      type: DataTypes.STRING
    },
    ownerHandle: {
      type: DataTypes.STRING
    },
    name2: {
      type: DataTypes.STRING
    },
    xrefPath: {
      type: DataTypes.STRING
    },
    fileId: {
      type: DataTypes.UUID,
      references: {
        model: "file",
        key: "id"
      },
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
    modelName: 'block'
  })

block.hasMany(entity,{foreignKey: "blockId"})
entity.belongsTo(block, {foreignKey: "blockId"})


export default block