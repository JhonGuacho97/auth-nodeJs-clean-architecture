import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos/Auth/login-user.dto";
import { CustomError } from "../../errors/custom.errors";
import { AuthRepository } from "../../repositories/Auth/auth.repository";

interface UserToken {
    token: string;
    user: {
      id: string;
      name: string;
      email:string
    };
  }
  
  type SignToken = (payload: Object, duration?:string) => Promise<string | null>;
  
  interface LoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<UserToken>;
  }


  export class LoginUser implements LoginUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ){}
     
    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
        
        const user = await this.authRepository.login(loginUserDto);

        const token = await this.signToken({id: user.id});
        if(!token) throw CustomError.internalServer('Error al generar el token');

        return {
            token: token,
            user:{
                id:user.id,
                email:user.email,
                name: user.name
            }
        }


    }
    
  }