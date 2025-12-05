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
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({ description: 'User registered successfully', type: AuthResponseDto })
  @ApiConflictResponse({ description: 'Username is already taken' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Authenticate with username and password' })
  @ApiOkResponse({ description: 'User authenticated', type: AuthResponseDto })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the currently authenticated user' })
  @ApiOkResponse({ description: 'Current user profile', type: PublicUserDto })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid access token' })
  me(@Req() req: AuthenticatedRequest) {
    return req.user;
  }
}
