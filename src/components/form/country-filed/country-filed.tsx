import ErrorInformation from '../../error-information/error-information';
import CountryAutocomplete from '../../country-autocomplite/country-autocomplite';
import {
  BaseFormProps,
  FormFieldsName,
  FormFieldsNameType,
} from '../../../types';

export const CountryField = ({
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
