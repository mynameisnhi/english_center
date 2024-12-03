import { registerAs } from '@nestjs/config';
import { version } from 'package.json';
import {
  ENUM_APP_ENVIRONMENT,
  ENUM_APP_TIMEZONE,
} from 'src/app/constants/app.enum.constant';

export default registerAs(
  'app',
  (): Record<string, any> => ({
    name: process.env.APP_NAME,
    env: process.env.APP_ENV ?? ENUM_APP_ENVIRONMENT.DEVELOPMENT,
    timezone: process.env.APP_TIMEZONE ?? ENUM_APP_TIMEZONE.ASIA_HO_CHI_MINH,
    version,

    debug: process.env.APP_DEBUG === 'true',

    http: {
      host: process.env.HTTP_HOST ?? 'localhost',
      port: process.env.HTTP_PORT
        ? Number.parseInt(process.env.HTTP_PORT)
        : 3000,
    },
  }),
);
