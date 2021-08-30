import { KeysService } from '../config/key.service';
import { createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (configService: KeysService) => {
      try {
        const config = configService.KEYS.DB;
        const isEnvDev = process.env.NODE_ENV === 'development';
        const connection = await createConnection({
          name: 'demo-db',
          type: 'postgres',
          host: config.DB_HOST_NAME,
          port: +config.DB_PORT,
          username: config.DB_USER_NAME,
          password: config.DB_PASSWORD,
          database: config.DB_NAME,
          entities: [__dirname + '/entities/*.entity{.ts,.js}'],
          migrations: [__dirname + '/migrations/*{.ts,.js}'],
          namingStrategy: new SnakeNamingStrategy(),
          synchronize: true,
          logging: isEnvDev,
        });
        return connection;
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
    },
    inject: [KeysService],
  },
];
