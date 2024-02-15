import { AuthDatSource, AuthRepository, RegisterUserDto, UserEntity } from "../../../domain";



export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly dataSource: AuthDatSource
    ){}
    
    register(registerUsertDto: RegisterUserDto): Promise<UserEntity> {
        return this.dataSource.register(registerUsertDto);
    }

}