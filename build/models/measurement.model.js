"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Measurement = void 0;
const sequelize_1 = require("sequelize");
class Measurement extends sequelize_1.Model {
    static initialize(sequelize) {
        Measurement.init({
            participant: { type: sequelize_1.DataTypes.STRING, unique: 'primary' },
            timestamp: { type: sequelize_1.DataTypes.INTEGER, unique: 'primary' },
            wh: { type: sequelize_1.DataTypes.INTEGER }
        }, { sequelize, timestamps: false, tableName: 'measurements' });
    }
}
exports.Measurement = Measurement;
//# sourceMappingURL=measurement.model.js.map