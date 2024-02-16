import { BcryptAdapter } from "../../../config";
import { UserModel } from "../../../data/mongodb";
import { UserMapper } from "../../mappers/user/user.mapper";
import {
  AuthDatSource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../../domain";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;


export class AuthDataSourceImpl implements AuthDatSource {

  constructor(
    private readonly hashFunction: HashFunction = BcryptAdapter.hash,
    private readonly compareFunction: CompareFunction = BcryptAdapter.compare
  ){}
  
    async register(registerUsertDto: RegisterUserDto): Promise<UserEntity> {
    
        const { name, email, password } = registerUsertDto;

    try {

      const existEmail = await UserModel.findOne({email});
      if( existEmail ) throw CustomError.badRequest('Este email ya existe!!');

      const user = await UserModel.create({
        name: name,
        email: email,
        password: this.hashFunction(password)
      });

      await user.save();

      return UserMapper.userEntityFromObject(user);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
