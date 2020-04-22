import { Table, Model, AutoIncrement, Column, PrimaryKey } from 'sequelize-typescript';
@Table({
   tableName: "grab_promote_channel",
   freezeTableName: true,
   timestamps: false,
})
export class PromoteChannel extends Model<PromoteChannel>  {
   @PrimaryKey
   @AutoIncrement
   @Column
   id!: number;
   @Column
   userid!: number;
   @Column
   elem_url!: string;
   @Column
   elem_share_url!: string;
   @Column
   elem_auth_info!: string;
   @Column
   rid!: string;
   @Column
   mt_url!: string;
   @Column
   elem_origin_url!: string;
   @Column
   mt_origin_url!: string;
   @Column
   elem_shop_url!: string;
   @Column
   elem_shop_origin_url!: string;
}