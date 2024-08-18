import ErrorInformation from '../../error-information/error-information';
import { Label } from '../../label/label';

import {
  BaseFormProps,
  FormFieldsName,
  FormFieldsNameType,
} from '../../../types';
import { PasswordInputControl } from '../../password-input/password-input-control';
import { PasswordInputUncontrolled } from '../../password-input/password-input-uncontrol';

export const PasswordFields = ({
  register,
  errors,
  touchedFields,
}: BaseFormProps) => {
  const idPassword: FormFieldsNameType = FormFieldsName.password;
  const idPasswordConfirm: FormFieldsNameType = FormFieldsName.confirmPassword;

  const renderPasswordInput = (id: FormFieldsNameType, isHasLevel: boolean) => {
    return register ? (
      <PasswordInputControl
        id={id}
        register={register}
        {...(errors ? { errors } : {})}
        {...(touchedFields ? { touchedFields } : {})}
        isHasLevel={isHasLevel}
      />
    ) : (
      <PasswordInputUncontrolled
        id={id}
        {...(register ? { register } : {})}
        {...(errors ? { errors } : {})}
        {...(touchedFields ? { touchedFields } : {})}
        isHasLevel={isHasLevel}
      />
    );
  };
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={idPassword}>Password</Label>
          {renderPasswordInput(idPassword, true)}
        </div>
        <div className="space-y-2">
          <Label htmlFor={idPasswordConfirm}>Confirm Password</Label>
          {renderPasswordInput(idPasswordConfirm, false)}
        </div>
      </div>
      <ErrorInformation
        {...(errors ? { errors } : {})}
        {...(touchedFields ? { touchedFields } : {})}
        fields={[idPassword, idPasswordConfirm]}
      />
    </div>
  );
};
