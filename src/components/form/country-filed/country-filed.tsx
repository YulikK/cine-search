// import {
//   FieldErrors,
//   FieldValues,
//   Path,
//   UseFormRegister,
//   UseFormStateReturn,
// } from 'react-hook-form';
import ErrorInformation from '../../error-information/error-information';
import CountryAutocomplete from '../../country-autocomplite/country-autocomplite';
import {
  BaseFormProps,
  FormFieldsName,
  FormFieldsNameType,
} from '../../../types';

// interface PropsType<T extends FieldValues> {
//   id: Path<T>;

//   register: UseFormRegister<T>;
//   errors: FieldErrors<T>;
//   touchedFields: UseFormStateReturn<T>['touchedFields'];
// }

export const CountryField = ({
  // id,
  register,
  errors,
  touchedFields,
}: BaseFormProps) => {
  const id: FormFieldsNameType = FormFieldsName.country;
  return (
    <div className="space-y-2">
      <CountryAutocomplete
        id={id}
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
