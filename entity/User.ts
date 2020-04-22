import { Table, Model, AutoIncrement, Column, PrimaryKey } from 'sequelize-typescript';
@Table({
   tableName:"grab_user",
   freezeTableName:true,
   timestamps:false,
})
export class User extends Model<User> {
   @PrimaryKey
   @AutoIncrement
   @Column
   userid!: number;
   @Column
   username!: string;
   @Column
   avatar!: string;
   @Column
   mobile!: string;
   @Column
   password!: string;
   @Column
   wechat!: string;
   @Column
   value!: number;
   @Column
   gender!: number;
   @Column
   new!: number;
   @Column
   status!: number;
   @Column
   created!: number;
   @Column
   ali_account!: string;
   @Column
   realname!: string;
   @Column
   invite_qrcode!: string;
   @Column
   customer_qrcode!: string;
   @Column
   resource_from!: string;
   @Column
   wechat_id!: number;
   @Column
   notice_status!: string;
}