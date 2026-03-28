import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TrashService } from './trash.service';

@ApiTags('trash-bin')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('trash_bin')
export class TrashController {
  constructor(private readonly svc: TrashService) {}

  @Get()
  @ApiOperation({ summary: 'List trash items' })
  getTrash() { return this.svc.findAll(); }

  @Post()
  createTrash(@Body() data: any, @Req() req: any) { 
    const userId = req.user.id || req.user.userId;
    return this.svc.create({ ...data, deleted_by: userId }); 
  }

  @Patch(':id')
  updateTrash(@Param('id') id: string, @Body() data: any) { return this.svc.update(id, data); }

  @Delete(':id')
  deleteTrash(@Param('id') id: string) { return this.svc.delete(id); }
}
