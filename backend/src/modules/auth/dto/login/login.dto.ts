import { IsString } from 'class-validator';
import { UserResponseDto } from 'src/modules/user-management/dto/user-dto/user-dto';

export class LoginDTO {
  @IsString()
  identifier!: string;

  @IsString()
  password!: string;
}

export class LoginResponseDTO {
  user: UserResponseDto;
  accessToken: string;
  refreshToken: string;

  constructor(
    user: UserResponseDto,
    accessToken: string,
    refreshToken: string,
  ) {
    this.user = user;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
