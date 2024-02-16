import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos/Auth/register-user.dto";
import { CustomError } from "../../errors/custom.errors";
import { AuthRepository } from "../../repositories/Auth/auth.repository";

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

type SignToken = (payload: Object, duration?:string) => Promise<string | null>;

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

export class RegisterUser implements RegisterUserUseCase {

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ){}

  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
    
    //crear el usuario
    const user = await this.authRepository.register(registerUserDto);

    //Token
    const token = await this.signToken({ id: user.id }, '2h');
    if(!token) throw CustomError.internalServer('Error generate token');

    return {
        token: token,
        user: {
            id: user.id,
            name:user.name,
            email:user.email
        }
    }
  }
}
