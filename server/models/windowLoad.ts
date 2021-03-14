import {
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  Column,
  AllowNull,
  DataType,
  BelongsTo,
} from "sequelize-typescript";
import App from "./app";

@Table
export default class WindowLoad extends Model<WindowLoad> {
  @AllowNull(false)
  @Column(DataType.FLOAT)
  value: number;

  @Column
  ofId: number;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @BelongsTo(() => App, {
    constraints: false,
    as: "windowLoad",
    onDelete: "cascade",
    foreignKey: "ofId",
  })
  profileOwner: App;
}
