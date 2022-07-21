// import { Model, DataTypes, IntegerDataType, StringDataType } from 'sequelize';
import { Model, Table, Column, Length, HasOne, HasMany, BeforeCreate, BeforeUpdate, PrimaryKey, AutoIncrement, IsEmail, Unique } from 'sequelize-typescript';
import bcrypt from 'bcrypt';
import Post from './Post.model';
import Comment from './Comment.model';
const sequelize = require('../config/connection').default;

@Table({
  timestamps: false,
  freezeTableName: false,
  underscored: true,
  modelName: 'user'
})
export default class User extends Model<User> {

  @PrimaryKey
  @AutoIncrement
  @Column({allowNull: false})
  id!: number;

  @Column({allowNull: false})
  name!: string;

  @Unique
  @IsEmail
  @Column({allowNull: false})
  email!: string;

  @Length({min: 3})
  @Column({allowNull: false})
  password!: string;

  @HasMany(() => Post)
  posts?: Post[]

  @HasMany(() => Comment)
  comments?: Comment[]

  @BeforeCreate
  static async createHashPassword(instance: User) {
    instance.password = await bcrypt.hash(instance.password, 11);
  }

  @BeforeUpdate
  static async updateHashPassword(instance: User) {
    instance.password = await bcrypt.hash(instance.password, 11);
  }

  checkPassword(loginPw:string) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}