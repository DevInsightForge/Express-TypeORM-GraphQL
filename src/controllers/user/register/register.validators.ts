import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { User } from "../../../entities/User";

@ValidatorConstraint({ async: true, name: "exists" })
class UserExistsContrain implements ValidatorConstraintInterface {
  async validate(email: string) {
    const user = await User.findOne({ where: { email } });
    if (user) return false;
    return true;
  }
}

export function AlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UserExistsContrain,
    });
  };
}
