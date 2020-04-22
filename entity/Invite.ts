import { Table, Model, AutoIncrement, Column, PrimaryKey } from 'sequelize-typescript';
@Table({
   tableName:"grab_invite",
   freezeTableName:true,
   timestamps:false,
})
export class Invite extends Model<Invite> {
   @PrimaryKey
   @AutoIncrement
   @Column
   id!: number;
   @Column
   inviter_id!: number;

   @PrimaryKey
   @Column
   to_userid!: number;
   @Column
   order!: string;
   @Column
   hash_order!: number;
   @Column
   value!: number;
   @Column
   status!: number;
   @Column
   created!: number;
   @Column
   grant_id!: number;
   @Column
   chain!: string;
   @Column
   promote_chain!: string;
   @Column
   level!: 1|2|3|4;
   @Column
   level_1_count!: number;
   @Column
   level_2_count!: number;
   @Column
   level_3_count!: number;
   @Column
   rebate_rate!: string;
   @Column
   order_price!: number;
   @Column
   promote_qrcode!: string;
   @Column
   customer_qrcode!: string;
}