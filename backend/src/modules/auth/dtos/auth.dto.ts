export interface BasedAuthUserDto {
  id: string;
  email: string;
  password: string;
  roles: string[];
}

export type AuthDto = Pick<BasedAuthUserDto, 'email' | 'password'>;
export type UpdateUserDto = Partial<Pick<BasedAuthUserDto, 'email' | 'password'>>;
export type AuthUserJwtDto = Omit<BasedAuthUserDto, 'password' | 'email'>;
export type AuthUserLogged = Omit<BasedAuthUserDto, 'password'>;

export type RefreshTokenDto = {
  sub: string;
  roles: string[];
};
