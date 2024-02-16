

export class LoginUserDto {

    constructor( 
        public email: string,
        public password: string
    ){}

    static create(object: {[ key : string ]: any}): [string?, LoginUserDto?]{

        const { email, password } = object;

        if(!email) return ['El campo nombre es requerido'];
        if(!password) return ['El campo password es requerido'];


        return[undefined, new LoginUserDto(email, password)];
    }

}