"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const sequelize_1 = require("sequelize");
class StorageService {
    constructor(modelFn) {
        this._sequelize = new sequelize_1.Sequelize({
            dialect: 'sqlite',
            storage: 'storage.db',
            logging: false
        });
        if (modelFn) {
            this.initModels(modelFn);
        }
        this._sequelize.sync({ alter: true }).catch(err => console.log(err));
    }
    initModels(modelFn) {
        modelFn.forEach(m => m(this._sequelize));
    }
}
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map