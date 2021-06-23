"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const sequelize_1 = require("sequelize");
class Session extends sequelize_1.Model {
    static initialize(sequelize) {
        Session.init({
            sessionId: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            timestamp: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            duration: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
        }, {
            tableName: 'sessions',
            sequelize,
            timestamps: false
        });
    }
}
exports.Session = Session;
//# sourceMappingURL=session.model.js.map