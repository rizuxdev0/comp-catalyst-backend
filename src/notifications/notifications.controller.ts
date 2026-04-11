import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { NotificationsService } from './notifications.service';

@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get current user notifications' })
  findAll(@Req() req: any) {
    return this.notificationsService.findAllByUser(req.user.id || req.user.userId);
  }

  @Get('preferences')
  @ApiOperation({ summary: 'Get user notification preferences' })
  getPreferences(@Req() req: any) {
    return this.notificationsService.getPreferences(req.user.id || req.user.userId);
  }

  @Post('preferences')
  @ApiOperation({ summary: 'Create a notification preference' })
  createPreference(@Body() data: any, @Req() req: any) {
    return this.notificationsService.createPreference(req.user.id || req.user.userId, data);
  }

  @Patch('preferences/:id')
  @ApiOperation({ summary: 'Update a notification preference by ID' })
  updatePreferenceById(@Param('id') id: string, @Body() data: any, @Req() req: any) {
    return this.notificationsService.updatePreferenceById(id, req.user.id || req.user.userId, data);
  }

  @Patch('preferences')
  @ApiOperation({ summary: 'Update user notification preferences' })
  updatePreferences(@Body() data: any, @Req() req: any) {
    return this.notificationsService.updatePreferences(req.user.id || req.user.userId, data);
  }

  @Post()
  @ApiOperation({ summary: 'Create manual notification' })
  create(@Body() data: any, @Req() req: any) {
    return this.notificationsService.create({ ...data, userId: req.user.id || req.user.userId });
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark notification as read' })
  markAsRead(@Param('id') id: string, @Req() req: any) {
    return this.notificationsService.markAsRead(id, req.user.id || req.user.userId);
  }

  @Patch('read-all')
  @ApiOperation({ summary: 'Mark all user notifications as read' })
  markAllRead(@Req() req: any) {
    return this.notificationsService.markAllAsRead(req.user.id || req.user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete notification' })
  remove(@Param('id') id: string, @Req() req: any) {
    return this.notificationsService.delete(id, req.user.id || req.user.userId);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear all notifications' })
  clearAll(@Req() req: any) {
    return this.notificationsService.clearAll(req.user.id || req.user.userId);
  }

  @Post('push/subscribe')
  @ApiOperation({ summary: 'Subscribe to web push notifications' })
  subscribeToPush(@Body() subscription: any, @Req() req: any) {
    return this.notificationsService.saveSubscription(req.user.id || req.user.userId, subscription);
  }
}
