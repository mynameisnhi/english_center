import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
