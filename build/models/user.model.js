"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static initialize(sequelize) {
        User.init({
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            mail: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: sequelize_1.DataTypes.NUMBER,
                allowNull: true,
            },
            participant: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                defaultValue: 'unknown'
            },
            active_participation: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 'false'
            },
            receive_mail: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 'false'
            },
            receive_sms: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 'false'
            }
        }, {
            sequelize,
            tableName: 'users'
        });
    }
}
exports.User = User;
//# sourceMappingURL=user.model.js.map