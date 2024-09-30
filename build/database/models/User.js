"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbCon_1 = require("../connection/dbCon");
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    deactivate() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.online) {
                this.online = false;
                yield this.save();
            }
        });
    }
    ;
    activate() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.online) {
                this.online = true;
                yield this.save();
            }
        });
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    room: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    online: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    // password: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   set(value: string) {
    //     this.setDataValue('password', hash(value))
    //   },
    // },
}, {
    sequelize: dbCon_1.db,
    modelName: 'User',
    tableName: 'users',
    createdAt: true,
});
exports.default = User;
