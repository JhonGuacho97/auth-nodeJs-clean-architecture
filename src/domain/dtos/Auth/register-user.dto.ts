import { Validators } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = object;

    if (!name) return ["El nombre es requerido"];
    if (!email) return ["El correo es requerido"];
    if (!Validators.email.test(email))
      return ["El correo electronico no es valido"];
    if (!password) return ["El password es requerido"];
    if (password.length < 6)
      return ["El password debe tener minimo 6 caracteres"];

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}
