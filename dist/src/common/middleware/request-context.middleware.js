"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestContextMiddleware = void 0;
const common_1 = require("@nestjs/common");
const request_context_1 = require("../request-context");
let RequestContextMiddleware = class RequestContextMiddleware {
    use(req, _res, next) {
        const forwarded = req.headers['x-forwarded-for'];
        const realIp = req.headers['x-real-ip'];
        let ipAddress = null;
        if (typeof forwarded === 'string') {
            ipAddress = forwarded.split(',')[0].trim();
        }
        else if (typeof realIp === 'string') {
            ipAddress = realIp.trim();
        }
        else {
            ipAddress = req.ip || null;
        }
        const context = {
            ipAddress,
            userAgent: req.headers['user-agent'] || null,
        };
        request_context_1.requestContextStorage.run(context, () => {
            next();
        });
    }
};
exports.RequestContextMiddleware = RequestContextMiddleware;
exports.RequestContextMiddleware = RequestContextMiddleware = __decorate([
    (0, common_1.Injectable)()
], RequestContextMiddleware);
//# sourceMappingURL=request-context.middleware.js.map