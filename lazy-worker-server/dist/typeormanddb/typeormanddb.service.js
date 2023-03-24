"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmConfigService = void 0;
const common_1 = require("@nestjs/common");
const article_entity_1 = require("../articles/article.entity");
const constants_1 = require("../constants");
const user_entity_1 = require("../users/user.entity");
let TypeOrmConfigService = class TypeOrmConfigService {
    createTypeOrmOptions() {
        return {
            type: 'postgres',
            host: constants_1.appConstants.DATABASE_HOST,
            port: constants_1.appConstants.DATABASE_PORT,
            database: constants_1.appConstants.DATABASE_NAME,
            username: constants_1.appConstants.DATABASE_USER,
            password: constants_1.appConstants.DATABASE_PASSWORD,
            entities: [user_entity_1.User, article_entity_1.Article],
            migrations: ['dist/migrations/*.{ts,js}'],
            migrationsTableName: 'typeorm_migrations',
            logger: 'file',
            synchronize: true,
        };
    }
};
TypeOrmConfigService = __decorate([
    (0, common_1.Injectable)()
], TypeOrmConfigService);
exports.TypeOrmConfigService = TypeOrmConfigService;
//# sourceMappingURL=typeormanddb.service.js.map