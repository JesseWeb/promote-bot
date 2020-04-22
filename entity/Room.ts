import { Table, Model, AutoIncrement, Column, PrimaryKey, Default } from 'sequelize-typescript';
@Table({
   tableName: "grab_robot_room",
   freezeTableName: true,
   timestamps:true,
   createdAt:"created_time",
   updatedAt:false,
   deletedAt:false
})
export class Room extends Model<Room>  {
   @PrimaryKey
   @AutoIncrement
   @Column
   id!: number;
   @Column
   userid!: number;
   @Column
   robot_id!: number;
   @Column
   created_time!: number;
   @Column
   room_id!: string;
   @Column
   wechat!: string;
   @Column
   room_name!: string

   @Default(2)
   @Column
   status!: 1|2|3;
}