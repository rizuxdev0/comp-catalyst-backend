export declare enum AccountingEntryType {
    DEBIT = "debit",
    CREDIT = "credit"
}
export declare class AccountingMapping {
    id: string;
    rubricName: string;
    accountNumber: string;
    accountName: string;
    entryType: AccountingEntryType;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
