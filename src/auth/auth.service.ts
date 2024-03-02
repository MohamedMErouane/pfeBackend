import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/Login.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userservice:UserService
              , private jwtService:JwtService){}
 async Login(dto:LoginDto){
    const user= await this.validateUser(dto)
    const payload = {
        email: user.email,
        sub: {
          name: user.name,
        },

 };
 return {
    user,
    backendTokens: {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
        secret: process.env.jwtSecretKey,
      }),
      RefreshTokenKey: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.jwtRefreshTokenKey,
      })
    }
}


  
 }
               ////VALIDATION METHODES/////
 async validateUser(dto:LoginDto){
    const user = await this.userservice.findByEmail(dto.email);

if (user && (await compare(dto.password, user.password))) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...result } = user;
  return result;
}
throw new UnauthorizedException();

}
}
