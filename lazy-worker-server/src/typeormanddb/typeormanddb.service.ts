import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Article } from 'src/articles/article.entity';
import { appConstants } from 'src/constants';
import { User } from 'src/users/user.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: appConstants.DATABASE_HOST,
      port: appConstants.DATABASE_PORT,
      database: appConstants.DATABASE_NAME,
      username: appConstants.DATABASE_USER,
      password: appConstants.DATABASE_PASSWORD,
      entities: [User, Article],
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      synchronize: true, // never use TRUE in production!
    };
  }
}
