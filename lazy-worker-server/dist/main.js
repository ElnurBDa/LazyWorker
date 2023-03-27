"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors();
    await app.listen(parseInt(process.env.port));
    console.log(`[bootstrap] server is running on port: ${process.env.port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map