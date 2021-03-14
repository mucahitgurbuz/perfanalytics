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
export default class File extends Model<File> {
  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  type: string;

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
    as: "file",
    onDelete: "cascade",
    foreignKey: "ofId",
  })
  profileOwner: App;
}
