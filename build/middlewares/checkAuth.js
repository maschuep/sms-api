"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    let token;
    try {
        const secret = process.env.JWT_SECRET;
        token = req.headers.authorization.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (decoded == null) {
            console.log(token);
            res.status(403).send({ message: 'Unauthorized' });
        }
        req.body.tokenPayload = decoded;
        next();
    }
    catch (err) {
        res.status(403).send({ message: 'Unauthorized' });
    }
}
exports.verifyToken = verifyToken;
//# sourceMappingURL=checkAuth.js.map