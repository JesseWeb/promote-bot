import { Table, Model, AutoIncrement, Column, PrimaryKey } from 'sequelize-typescript';
@Table({
   tableName:"grab_user_wechat_bindings",
   freezeTableName:true,
   timestamps:false,
})
export class UserWechat extends Model<UserWechat> {
   @PrimaryKey
   @AutoIncrement
   @Column
   id!: number;
   @Column
   userid!: number;
   @Column
   wechat!: string;
   @Column
   created_time!: number;
   @Column
   robot_tag!: string;
}