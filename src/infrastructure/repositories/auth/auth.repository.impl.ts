import { AuthDatSource, AuthRepository, LoginUserDto, RegisterUserDto, UserEntity } from "../../../domain";



export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly dataSource: AuthDatSource
    ){}
    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.dataSource.login(loginUserDto);
    }
    
    register(registerUsertDto: RegisterUserDto): Promise<UserEntity> {
        return this.dataSource.register(registerUsertDto);
    }

}