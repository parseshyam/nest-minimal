import { Injectable, Scope } from '@nestjs/common';
import { config } from 'dotenv';
import * as fs from 'fs';

@Injectable({ scope: Scope.DEFAULT })
export class KeysService {
  private defaultEnv = ['development', 'staging', 'production'];

  public readonly KEYS = <IConfigKeys>{};

  // TODO Check and validate the env file and it's respective keys before proceeding any further.
  constructor() {
    console.log('CHECK CONFIG KEYS CONTROLLER CALLED');
    // * Will check the env file.
    this.checkEnv();
    // * Will check the env file contents.
    this.checkEnvKeys();
  }

  private checkEnv = () => {
    if (!process.env.NODE_ENV) {
      console.warn('No enviroment specified! please run below command:- ');
      console.log(
        'npx cross-env NODE_ENV=[ development | staging | production ] node build/main.js',
      );
      console.log(
        'For now falling back to default "development" enviroment and using it.',
      );
      process.env['NODE_ENV'] = 'development';
    } else if (!this.defaultEnv.includes(process.env.NODE_ENV)) {
      console.log(
        `Invalid enviroment specified allowed enviroments are ${this.defaultEnv.join(
          ', ',
        )}`,
      );
      process.exit(1);
    }
    const isEnvExists = fs.existsSync(`.${process.env.NODE_ENV}.env`);
    if (!isEnvExists) {
      console.log(
        `Enviroment file is missing please add .${process.env.NODE_ENV}.env in your root dir.`,
      );
      process.exit(1);
    }
  };

  private checkEnvKeys = () => {
    config({ path: `.${process.env.NODE_ENV}.env` });
    const ENV = process.env?.NODE_ENV?.toUpperCase() || 'DEVELOPMENT';

    const DB = <I_DB>{};
    const AWS = <I_AWS>{};
    const FCM = <I_FCM>{};
    const TOKEN = <I_TOKEN>{};
    const REDIS = <I_REDIS>{};

    // * 1.DB CONFIG.
    DB.DB_PORT = process.env[`${ENV}_DB_PORT`];
    DB.DB_NAME = process.env[`${ENV}_DB_NAME`];
    DB.TIME_ZONE = process.env[`${ENV}_TIME_ZONE`];
    DB.DB_PASSWORD = process.env[`${ENV}_DB_PASSWORD`];
    DB.DB_USER_NAME = process.env[`${ENV}_DB_USER_NAME`];
    DB.DB_HOST_NAME = process.env[`${ENV}_DB_HOST_NAME`];

    // * 2.TOKEN CONFIG.
    TOKEN.TOKEN_TYPE = process.env[`${ENV}_TOKEN_TYPE`];
    TOKEN.ACCESS_EXP = process.env[`${ENV}_ACCESS_EXP`];
    TOKEN.REFRESH_EXP = process.env[`${ENV}_REFRESH_EXP`];
    TOKEN.ACCESS_TOKEN = process.env[`${ENV}_ACCESS_TOKEN`];
    TOKEN.REFRESH_TOKEN = process.env[`${ENV}_REFRESH_TOKEN`];
    TOKEN.ADMIN_ACCESS_TOKEN = process.env[`${ENV}_ADMIN_ACCESS_TOKEN`];
    TOKEN.ADMIN_REFRESH_TOKEN = process.env[`${ENV}_ADMIN_REFRESH_TOKEN`];

    // * 3.AWS
    AWS.AWS_FROM_EMAIL = process.env[`${ENV}_AWS_FROM_EMAIL`];
    AWS.AWS_ACCESS_KEY = process.env[`${ENV}_AWS_ACCESS_KEY`];
    AWS.AWS_SECRET_KEY = process.env[`${ENV}_AWS_SECRET_KEY`];
    AWS.AWS_SES_REGION = process.env[`${ENV}_AWS_SES_REGION`];

    // * 4.REDIS
    REDIS.REDIS_HOST = process.env[`${ENV}_REDIS_HOST`];
    REDIS.REDIS_PORT = +process.env[`${ENV}_REDIS_PORT`];

    // * 4.FCM
    FCM.type = process.env[`${ENV}_type`];
    FCM.auth_uri = process.env[`${ENV}_auth_uri`];
    FCM.token_uri = process.env[`${ENV}_token_uri`];
    FCM.client_id = process.env[`${ENV}_client_id`];
    FCM.project_id = process.env[`${ENV}_project_id`];
    FCM.private_key =
      process.env[`${ENV}_private_key`]?.replace(/\\n/g, '\n') || '';
    FCM.client_email = process.env[`${ENV}_client_email`];
    FCM.private_key_id = process.env[`${ENV}_private_key_id`];
    FCM.client_x509_cert_url = process.env[`${ENV}_client_x509_cert_url`];
    FCM.auth_provider_x509_cert_url =
      process.env[`${ENV}_auth_provider_x509_cert_url`];

    const ALL_ENVS = {
      ...DB,
      ...AWS,
      ...FCM,
      ...TOKEN,
      ...REDIS,
    };

    const missingEnvKeys: Array<string> = [];
    for (const [key, value] of Object.entries(ALL_ENVS)) {
      if (!value) {
        missingEnvKeys.push(`${ENV}_${key} = \n`);
      }
    }

    if (missingEnvKeys.length) {
      console.log(
        `Missing Env Keys: Please copy and set following keys in .${process.env.NODE_ENV}.env file \n \n`,
      );
      console.log(missingEnvKeys.join(''));
      process.exit(1);
    }

    this.KEYS.DB = DB;
    this.KEYS.TOKEN = TOKEN;
    this.KEYS.FCM = FCM;
    this.KEYS.AWS = AWS;
    this.KEYS.REDIS = REDIS;
  };

  get(key: string): IConfigKeys {
    return this.KEYS[key];
  }
}
