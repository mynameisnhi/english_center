import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';

import { PATH_UPLOADS } from './common';
import configs from './configs';
import { DatabaseModule } from './database/database.module';
import { RouterModule } from './router/router.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env', '.env.development'],
      expandVariables: true,
    }),
    DatabaseModule,
    RouterModule.forRoot(),
    MulterModule.register({
      dest: PATH_UPLOADS,
    }),
    ServeStaticModule.forRoot({
      rootPath: PATH_UPLOADS,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
