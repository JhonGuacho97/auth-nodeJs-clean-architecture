import { RegisterUserDto } from "../../dtos/Auth/register-user.dto";
import { UserEntity } from "../../entities/user.entity";



export abstract class AuthRepository{

    
    //abstract login(email:string, password:string): Promise<UserEntity>;
    abstract register( registerUsertDto: RegisterUserDto): Promise<UserEntity>;


}