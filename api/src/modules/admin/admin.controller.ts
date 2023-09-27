import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Res,
  Req,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Public } from '../auth/public.decorator';
import { Request, Response } from 'express';
import { DASHBOARD_AUTH_COOKIE } from '../../constants/cookies';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Public()
  @HttpCode(200)
  @Post('/login')
  async login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token } = await this.adminService.login(loginAdminDto);
    res.cookie(DASHBOARD_AUTH_COOKIE, token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      domain:
        process.env.NODE_ENV === 'production'
          ? process.env.COOKIE_DOMAIN
          : undefined,
      path: '/',
    });
  }

  @HttpCode(200)
  @Post('/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies[DASHBOARD_AUTH_COOKIE];
    await this.adminService.logout(token);
    res.clearCookie(DASHBOARD_AUTH_COOKIE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      domain:
        process.env.NODE_ENV === 'production'
          ? process.env.COOKIE_DOMAIN
          : undefined,
      path: '/',
    });
  }

  @Get('/me')
  findMe(@Req() req: Request) {
    return this.adminService.findMe(req.cookies[DASHBOARD_AUTH_COOKIE]);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
