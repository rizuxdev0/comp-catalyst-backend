import { User } from '../../users/entities/user.entity';
import { Department } from '../../departments/entities/department.entity';
import { Establishment } from '../../establishments/entities/establishment.entity';
export declare enum EmployeeStatus {
    ACTIVE = "active",
    ON_LEAVE = "on_leave",
    SUSPENDED = "suspended",
    TERMINATED = "terminated",
    RETIRED = "retired"
}
export declare enum EmploymentType {
    PERMANENT = "permanent",
    FIXED_TERM = "fixed_term",
    INTERN = "intern",
    CONSULTANT = "consultant",
    TEMPORARY = "temporary"
}
export declare enum WorkMode {
    ON_SITE = "on_site",
    REMOTE = "remote",
    HYBRID = "hybrid"
}
export declare enum GenderType {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other",
    PREFER_NOT_TO_SAY = "prefer_not_to_say"
}
export declare enum CivilityType {
    MR = "mr",
    MRS = "mrs",
    MS = "ms",
    DR = "dr",
    PROF = "prof"
}
export declare enum MaritalStatus {
    SINGLE = "single",
    MARRIED = "married",
    DIVORCED = "divorced",
    WIDOWED = "widowed",
    SEPARATED = "separated",
    PACS = "pacs"
}
export declare enum SalaryFrequency {
    MONTHLY = "monthly",
    BIWEEKLY = "biweekly",
    WEEKLY = "weekly",
    ANNUAL = "annual"
}
export declare enum ShiftType {
    DAY = "day",
    NIGHT = "night",
    ROTATING = "rotating",
    FLEXIBLE = "flexible"
}
export declare enum MarriageRegime {
    COMMUNITY = "community",
    SEPARATION = "separation",
    PARTICIPATION = "participation",
    UNIVERSAL_COMMUNITY = "universal_community"
}
export declare class Employee {
    id: string;
    userId: string;
    user: User;
    employee_code: string;
    employee_number: string;
    civility: CivilityType;
    first_name: string;
    last_name: string;
    middle_name: string;
    preferred_name: string;
    gender: GenderType;
    date_of_birth: string;
    place_of_birth: string;
    nationality: string;
    marital_status: MaritalStatus;
    spouse_name: string;
    marriage_regime: MarriageRegime;
    number_of_dependents: number;
    national_id_number: string;
    passport_number: string;
    passport_expiration_date: string;
    social_security_number: string;
    tax_number: string;
    personal_email: string;
    work_email: string;
    personal_phone: string;
    work_phone: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state_or_province: string;
    postal_code: string;
    country_code: string;
    job_title: string;
    job_level: string;
    department_id: string;
    department: Department;
    establishment_id: string;
    establishment: Establishment;
    employee_status: EmployeeStatus;
    employment_type: EmploymentType;
    employment_start_date: string;
    employment_end_date: string;
    work_location: string;
    work_mode: WorkMode;
    manager_employee_code: string;
    probation_start_date: string;
    probation_end_date: string;
    working_hours_per_week: number;
    working_days_per_week: number;
    shift_type: ShiftType;
    overtime_eligible: boolean;
    worker_category: string;
    preferred_payment_method: string;
    mobile_money_number: string;
    mobile_money_provider: string;
    base_salary: number;
    salary_frequency: SalaryFrequency;
    salary_currency: string;
    salary_effective_date: string;
    bonus_eligible: boolean;
    benefits_eligible: boolean;
    health_insurance_provider: string;
    pension_plan: string;
    insurance_policy_number: string;
    benefit_start_date: string;
    bank_id: string;
    bank_account_number: string;
    bank_iban: string;
    bank_bic: string;
    hire_source: string;
    performance_rating: number;
    career_level: string;
    succession_eligible: boolean;
    education_level: string;
    diploma: string;
    diploma_year: number;
    education_institution: string;
    disability_status: string;
    medical_restrictions: string;
    last_medical_check_date: string;
    emergency_contact_name: string;
    emergency_contact_phone: string;
    emergency_contact_relationship: string;
    avatar_url: string;
    created_at: Date;
    updated_at: Date;
    generateEmployeeCode(): void;
}
