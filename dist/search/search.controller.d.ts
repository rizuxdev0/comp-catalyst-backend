import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    globalSearch(query: string): Promise<{
        type: string;
        id: string;
        title: string;
        subtitle: string;
        url: string;
    }[]>;
}
