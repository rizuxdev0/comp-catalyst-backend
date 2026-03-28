import { Response } from 'express';
export declare class StorageController {
    upload(file: Express.Multer.File): {
        url: string;
        originalName: string;
        filename: string;
        size: number;
        mimetype: string;
    };
    serveFile(filename: string, res: Response): void;
}
