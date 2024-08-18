import ErrorInformation from '../../error-information/error-information';
import Input from '../../input/input';
import { Label } from '../../label/label';
import {
  BaseFormProps,
  FormFieldsName,
  FormFieldsNameType,
} from '../../../types';

export const EmailField = ({
  register,
  errors,
  touchedFields,
}: BaseFormProps) => {
  const id: FormFieldsNameType = FormFieldsName.email;
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Email</Label>
      <Input
        id={id}
        autoComplete={id}
        type={id}
        {...(register ? { register } : {})}
        {...(errors ? { errors } : {})}
        {...(touchedFields ? { touchedFields } : {})}
      />
      <ErrorInformation
        {...(errors ? { errors } : {})}
        {...(touchedFields ? { touchedFields } : {})}
        fields={[id]}
      />
    </div>
  );
};
