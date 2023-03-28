import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfigService } from './typeormanddb/typeormanddb.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { LikeModule } from './like/like.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    ArticlesModule,
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    LikeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
