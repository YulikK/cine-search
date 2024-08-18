import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Label } from '../label/label';
import Input from '../input/input';
// import {
//   FieldErrors,
//   FieldValues,
//   Path,
//   UseFormRegister,
//   UseFormStateReturn,
// } from 'react-hook-form';
import { BaseFormProps, FormFieldsNameType } from '../../types';

// interface PropsType<T extends FieldValues> {
//   id: Path<T>;
//   register?: UseFormRegister<T>;
//   errors?: FieldErrors<T>;
//   touchedFields?: UseFormStateReturn<T>['touchedFields'];
// }
interface PropsType extends BaseFormProps {
  id: FormFieldsNameType;
}

const CountryAutocomplete = ({
  id,
  register,
  errors,
  touchedFields,
}: PropsType) => {
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );

  return (
    <div className="relative">
      <Label htmlFor={id}>Country</Label>
      <Input
        id={id}
        autoComplete={id}
        type={'list'}
        placeholder="Select a country"
        list={`${id}-list`}
        register={register}
        errors={errors}
        touchedFields={touchedFields}
      />
      <datalist id={`${id}-list`}>
        {countries.map((country) => (
          <option key={country}>{country}</option>
        ))}
      </datalist>
    </div>
  );
};

export default CountryAutocomplete;
