import { Model } from "sequelize";

interface DoorAttributes {
  id: string;
  location: string;
  status: string;
}

interface DoorCreationAttributes extends Omit<DoorAttributes, "id"> {}

export interface DoorInstance
  extends Model<DoorAttributes, DoorCreationAttributes>,
    DoorAttributes {}
