import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Task } from "./Task.js";

export const Project = sequelize.define(
  "projects",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    priority: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

Project.hasMany(Task, {
  foreinkey: "projectId",
  sourceKey: "id",
});
Task.belongsTo(Project, { foreinkey: "projectId", targetId: "id" });
