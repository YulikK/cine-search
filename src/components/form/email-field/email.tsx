// import {
//   FieldErrors,
//   FieldValues,
//   Path,
//   UseFormRegister,
//   UseFormStateReturn,
// } from 'react-hook-form';
import ErrorInformation from '../../error-information/error-information';
import Input from '../../input/input';
import { Label } from '../../label/label';
import {
  BaseFormProps,
  FormFieldsName,
  FormFieldsNameType,
} from '../../../types';

// interface PropsType<T extends FieldValues> {
//   id: Path<T>;
//   register?: UseFormRegister<T>;
//   errors?: FieldErrors<T>;
//   touchedFields?: UseFormStateReturn<T>['touchedFields'];
// }

export const EmailField = ({
  // id,
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
