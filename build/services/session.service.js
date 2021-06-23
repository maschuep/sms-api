"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const session_model_1 = require("../models/session.model");
class SessionService {
    static trackSession(session) {
        session_model_1.Session.findOne({ where: { sessionId: session.sessionId } })
            .then(s => {
            s.duration = Date.now();
            s.save();
        })
            .catch(err => {
            console.log(err);
        });
    }
}
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map