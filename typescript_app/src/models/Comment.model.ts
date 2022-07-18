// import { Model, DataTypes } from 'sequelize';
import { Model, Table, Column, PrimaryKey, AutoIncrement, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import Post from './Post.model';
import User from './User.model';
const sequelize = require('../config/connection').default;

@Table({
  timestamps: false,
  freezeTableName: false,
  underscored: true,
  modelName: 'comment'
})
export default class Comment extends Model<Comment> {

  @ForeignKey(() => Post)
  @Column({allowNull: false})
  post_id!: number;
  
  @BelongsTo(() => Post)
  post!: Post

  @PrimaryKey
  @AutoIncrement
  @Column({allowNull: false})
  id!: number;
  
  @Column({allowNull: false})
  comment!: string;

  @Column({allowNull: false})
  author!: string;

  @ForeignKey(() => User)
  @Column({allowNull: false})
  author_id!: number;

  @BelongsTo(() => User)
  user!: User

  @Column({ allowNull: false, defaultValue: DataType.NOW })
  date_created!: Date;
}