import jwt from 'jsonwebtoken';
import { envs } from './envs';
const JWT_SEED = envs.JWT_SEED;

interface Options {
    payload: Object,
    duration?: string
}


export class JwtAdapter {

    
    static async generateToken( options: Options ):Promise<string|null>{

        const { payload, duration = '2h' } = options;

        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SEED, {expiresIn: duration}, (err, token) => {
                if(err) return resolve(null);

                resolve(token!);
            });
        });

    }



    static validateToken<T>( token: string ):Promise<T | null>{

        return new Promise((resolve) => {
            
            jwt.verify(token, JWT_SEED, (err, decoded) => {

                if(err) return resolve(null);

                resolve(decoded as T);

            });
            
        });

    }
}