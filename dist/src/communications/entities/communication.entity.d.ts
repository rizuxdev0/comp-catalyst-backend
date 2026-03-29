import { Employee } from '../../employees/entities/employee.entity';
import { Department } from '../../departments/entities/department.entity';
export declare class Communication {
    id: string;
    title: string;
    content: string;
    document_type: string;
    recipient_type: string;
    recipient_employee_id: string | null;
    recipient_employee: Employee;
    recipient_department_id: string | null;
    recipient_department: Department;
    status: string;
    published_at: Date | null;
    created_by: string | null;
    created_at: Date;
    updated_at: Date;
}
