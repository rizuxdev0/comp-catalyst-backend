import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SearchService } from './search.service';
import { Permissions } from '../common/decorators/permissions.decorator';

@ApiTags('search')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @Permissions('search.use')
  @ApiOperation({ summary: 'Global search across entities' })
  async globalSearch(@Query('q') query: string) {
    return this.searchService.globalSearch(query);
  }
}
