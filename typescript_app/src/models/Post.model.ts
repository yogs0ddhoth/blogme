// import { Model, DataTypes } from 'sequelize';
import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import Comment from './Comment.model';
import User from './User.model';
const sequelize = require('../config/connection').default;

@Table({
  timestamps: false,
  freezeTableName: false,
  underscored: true,
  modelName: 'post',
})
export default class Post extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({allowNull: false})
  id!: number;

  @Column({allowNull: false})
  name!: string;

  @Column
  description!: string;

  @ForeignKey(() => User)
  @Column({allowNull: false})
  user_id!: number

  @BelongsTo(() => User)
  user!: User

  @Column({ allowNull: false, defaultValue: DataType.NOW })
  date_created!: Date;

  @HasMany(() => Comment)
  comments?: Comment[]
}