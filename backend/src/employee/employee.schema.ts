// src/employee/employee.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema({ collection: 'employees' }) 
export class Employee {
  @Prop({ required: true }) empId: number;
  @Prop() name: string;
  @Prop() contactNo: string;
  @Prop() emailId: string;
  @Prop() city: string;
  @Prop() state: string;
  @Prop() pinCode: string;
  @Prop() address: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
