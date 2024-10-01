import { db } from '../connection/dbCon'
import { Model, Optional, DataTypes } from 'sequelize'
import { hash } from '../../utils/user'
interface UserAttributes {
  id: string
  name: string
  room: string
  phoneNumber: number;
  online?: boolean
  createdAt?: Date
  updatedAt?: Date
}

type UserCreationAttributes = Optional<
  UserAttributes,
  'createdAt' | 'updatedAt' | 'online'
>

class User extends Model<UserAttributes, UserCreationAttributes> {
  public async deactivate() {
    if(this.online) {
      this.online = false
      await this.save();
    }
  };
  public async activate() {
    if(!this.online) {
      this.online = true
      await this.save();
    }
  }
  public id!: string;
  public name!: string;
  public room!: string;
  public online!: boolean;
  public phoneNumber!: number;
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    room: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    online: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'User',
    tableName: 'users',
    createdAt: true,
  }
)

export default User
