import { userDTO } from './user.dto';

export interface LoginFormDTO {
  email: string;
  password: string;
}

export interface RegistrstionFormDTO {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  accessToken: string;
  refreshToken: string;
  user: userDTO;
}
