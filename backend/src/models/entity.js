'use strict';
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/dbConnection.js";

const entity =  sequelize.define(
  'entity',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    blockId: {
      type: DataTypes.UUID,
      references: {
        model: "block",
        key: "id"
      },
    },
    type: {
      type: DataTypes.STRING
    },
    coOrdinates: {
      type: DataTypes.JSONB
    },
    handle: {
      type: DataTypes.STRING
    },
    ownerHandle: {
      type: DataTypes.STRING
    },
    color: {
      type: DataTypes.INTEGER
    },
    colorIndex: {
      type: DataTypes.INTEGER
    },
    shape: {
      type: DataTypes.BOOLEAN
    },
    normalVector: {
      type: DataTypes.JSONB
    },
    degreeOfSplineCurve: {
      type: DataTypes.INTEGER
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
    modelName: 'entity'
  })

export default entity