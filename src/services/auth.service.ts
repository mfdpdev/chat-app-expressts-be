import AuthValidation from "../validations/auth.validation"
import { Validation } from "../validations/validation"

export default class AuthService {
  static async signin(data: any) {
    const validatedData = Validation.validate(AuthValidation.SIGNIN, data);
  }
}
