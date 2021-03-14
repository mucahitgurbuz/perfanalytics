import { Table, Column, Model, DataType, Unique } from 'sequelize-typescript';

@Table
export default class SuperAdmin extends Model<SuperAdmin> {
  @Unique
  @Column(DataType.STRING)
  userCode: string
}