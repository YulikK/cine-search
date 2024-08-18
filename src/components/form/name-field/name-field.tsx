import ErrorInformation from '../../error-information/error-information';
import Input from '../../input/input';
import { Label } from '../../label/label';
import {
  BaseFormProps,
  FormFieldsName,
  FormFieldsNameType,
} from '../../../types';

export const NameField = ({
  register,
  errors,
  touchedFields,
}: BaseFormProps) => {
  const id: FormFieldsNameType = FormFieldsName.name;
  return (
    <div>
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          id={id}
          autoComplete={id}
          type={'text'}
          {...(register ? { register } : {})}
          {...(errors ? { errors } : {})}
          {...(touchedFields ? { touchedFields } : {})}
        />
      </div>

      <ErrorInformation
        {...(errors ? { errors } : {})}
        {...(touchedFields ? { touchedFields } : {})}
        fields={[id]}
      />
    </div>
  );
};
