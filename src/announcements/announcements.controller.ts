import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { AnnouncementsService } from './announcements.service';
import { Announcement } from './entities/announcement.entity';

@Controller('announcements')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AnnouncementsController {
  constructor(private service: AnnouncementsService) {}

  @Get()
  @Permissions('announcements.view')
  findAll(@Query('all') all?: string) {
    return this.service.findAll(all !== 'true');
  }

  @Get(':id')
  @Permissions('announcements.view')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Permissions('announcements.manage')
  create(@Body() data: Partial<Announcement>, @Req() req: any) {
    return this.service.create(data, req.user);
  }

  @Put(':id')
  @Permissions('announcements.manage')
  update(@Param('id') id: string, @Body() data: Partial<Announcement>) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @Permissions('announcements.manage')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
