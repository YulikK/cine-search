import ErrorInformation from '../../error-information/error-information';
import Input from '../../input/input';
import { Label } from '../../label/label';
import { RadioButton } from '../../radio-button/radio-button';
import {
  BaseFormProps,
  FormFieldsName,
  FormFieldsNameType,
  Gender,
} from '../../../types';

export const AgeGenderFields = ({
  register,
  errors,
  touchedFields,
}: BaseFormProps) => {
  const idAge: FormFieldsNameType = FormFieldsName.age;
  const idGender: FormFieldsNameType = FormFieldsName.gender;
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={idAge}>Age</Label>
          <Input
            id={idAge}
            autoComplete={idAge}
            type={'number'}
            {...(register ? { register } : {})}
            {...(errors ? { errors } : {})}
            {...(touchedFields ? { touchedFields } : {})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={idGender}>Gender</Label>
          <div className="flex gap-2">
            <RadioButton
              htmlFor={`${idGender}-${Gender.F}`}
              {...(errors ? { errors } : {})}
            >
              <Input
                id={idGender}
                type={'radio'}
                {...(register ? { register } : {})}
                {...(errors ? { errors } : {})}
                {...(touchedFields ? { touchedFields } : {})}
                value={Gender.F}
              />
              <img
                className="inline-flex w-4 h-4"
                src={`/icons/${idGender}-${Gender.F}.png`}
                alt={idGender}
              />
            </RadioButton>
            <RadioButton
              htmlFor={`${idGender}-${Gender.M}`}
              {...(errors ? { errors } : {})}
            >
              <Input
                id={idGender}
                type={'radio'}
                value={Gender.M}
                {...(register ? { register } : {})}
                {...(errors ? { errors } : {})}
                {...(touchedFields ? { touchedFields } : {})}
              />
              <img
                className="inline-flex w-4 h-4"
                src={`/icons/${idGender}-${Gender.M}.png`}
                alt={idGender}
              />
            </RadioButton>
          </div>
        </div>
      </div>
      <ErrorInformation
        {...(errors ? { errors } : {})}
        {...(touchedFields ? { touchedFields } : {})}
        fields={[idAge, idGender]}
      />
    </div>
  );
};
