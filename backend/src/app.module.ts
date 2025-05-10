import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeModule } from './employee/employee.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://keerthanaganesan074:keerthana074@crud.rk5b2ft.mongodb.net/test'),
    EmployeeModule,
  ],
})
export class AppModule {}

