import { Module } from '@nestjs/common';
import { StudentApiController } from 'src/modules/students/controllers/students.api.controller';
import { StudentModule } from 'src/modules/students/students.module';

@Module({
  imports: [StudentModule],
  exports: [],
  providers: [],
  controllers: [StudentApiController],
})
export class RouterStudentModule {}
