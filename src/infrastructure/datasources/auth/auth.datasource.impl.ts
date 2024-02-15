import {
  AuthDatSource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../../domain";

export class AuthDataSourceImpl implements AuthDatSource {
  
    async register(registerUsertDto: RegisterUserDto): Promise<UserEntity> {
    
        const { name, email, password } = registerUsertDto;

    try {

        return new UserEntity(
            '1',
            name,
            email,
            password,
            ['ADMIN_ROLE'],
            
        );

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
