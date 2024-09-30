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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = void 0;
exports.userJoin = userJoin;
exports.getCurrentUser = getCurrentUser;
exports.getRoomUsers = getRoomUsers;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../database/models/User"));
// utiles for user model
const hash = (pass) => {
    return bcrypt_1.default.hashSync(pass, 10);
};
exports.hash = hash;
function userJoin(id, name, room, phoneNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const [user, created] = yield User_1.default.findOrCreate({
            where: { phoneNumber },
            defaults: { id, name, room, phoneNumber, online: true },
        });
        if (created) {
            return user;
        }
        else {
            yield user.activate();
            return user;
        }
    });
}
function getCurrentUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.findOne({
            where: { id },
        });
        return user;
    });
}
function getRoomUsers(room) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield User_1.default.findAll({
            where: { room },
        });
        return users;
    });
}
