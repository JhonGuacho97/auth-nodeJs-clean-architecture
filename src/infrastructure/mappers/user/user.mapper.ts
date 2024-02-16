import { Validators } from "../../../config";
import { CustomError, UserEntity } from "../../../domain";




export class UserMapper {

    static userEntityFromObject(object: {[key:string]:any}){

        const { _id, id, name, email, password, roles } = object;

        if(!id || !_id) throw CustomError.badRequest('Falta el id');
        if(!name) throw CustomError.badRequest('Falta el name');
        if(!Validators.email.test(email)) throw CustomError.badRequest('el email no es valido');
        if(!email) throw CustomError.badRequest('Falta el email');
        if(!password) throw CustomError.badRequest('Falta la password');
        if( password.length < 6 ) throw CustomError.badRequest('La password debe contener al menos 6 caracteres');
        
        return new UserEntity(
            id || _id,
            name,
            email,
            password,
            roles
        )
    }

}