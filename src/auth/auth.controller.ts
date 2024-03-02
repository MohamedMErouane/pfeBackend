import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/Login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
 constructor(private userservice:UserService,
    private authservice:AuthService){}
 
    @Post('register')
    async registerUser(@Body() dto:CreateUserDto){
        return await this.userservice.create(dto)
    }
    @Post('Login')
    async Login(@Body() dto:LoginDto){
       return await this.authservice.Login(dto)
    }
    
}
