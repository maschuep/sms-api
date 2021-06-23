"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Participant = void 0;
const sequelize_1 = require("sequelize");
class Participant extends sequelize_1.Model {
    static initialize(sequelize) {
        Participant.init({
            participantId: {
                type: sequelize_1.DataTypes.STRING,
                primaryKey: true
            },
            num_people: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            housing_type: {
                type: sequelize_1.DataTypes.ENUM('Wohnung', 'Freistehendes Haus', 'Mehrfamilienhaus'),
                allowNull: false
            },
            heating_type: {
                type: sequelize_1.DataTypes.ENUM('Öl', 'Erdwärme', 'Pellets', 'Stückholz'),
                allowNull: false
            }
        }, {
            tableName: 'participants',
            sequelize,
            timestamps: false
        });
    }
}
exports.Participant = Participant;
//# sourceMappingURL=participant.model.js.map