import { Training } from './training.entity';
import { Employee } from '../../employees/entities/employee.entity';
export declare class TrainingEnrollment {
    id: string;
    trainingId: string;
    training: Training;
    employeeId: string;
    employee: Employee;
    enrolledAt: Date;
    completedAt: Date;
    certificationUrl: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
