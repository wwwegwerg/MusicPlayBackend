import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { Request } from 'express';
import { PublicUser } from '../users/users.service';
import { PublicUserDto } from '../users/dto/public-user.dto';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
  user: PublicUser;
}

@Controller('auth')
@ApiTags('Аутентификация')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Зарегистрировать нового пользователя' })
  @ApiCreatedResponse({ description: 'Пользователь успешно зарегистрирован', type: AuthResponseDto })
  @ApiConflictResponse({ description: 'Имя пользователя уже занято' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Авторизоваться по имени пользователя и паролю' })
  @ApiOkResponse({ description: 'Пользователь аутентифицирован', type: AuthResponseDto })
  @ApiUnauthorizedResponse({ description: 'Неверные учетные данные' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить текущего аутентифицированного пользователя' })
  @ApiOkResponse({ description: 'Профиль текущего пользователя', type: PublicUserDto })
  @ApiUnauthorizedResponse({ description: 'Отсутствует или недействительный токен доступа' })
  me(@Req() req: AuthenticatedRequest) {
    return req.user;
  }
}
