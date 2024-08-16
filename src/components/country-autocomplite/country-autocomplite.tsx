import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Label } from '../label/label';
import Input from '../input/input';
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormStateReturn,
} from 'react-hook-form';

interface PropsType<T extends FieldValues> {
  id: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  touchedFields: UseFormStateReturn<T>['touchedFields'];
}

const CountryAutocomplete = <T extends FieldValues>({
  id,
  register,
  errors,
  touchedFields,
}: PropsType<T>) => {
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );

  return (
    <div className="relative">
      <Label htmlFor="country">Country</Label>
      <Input
        id={id}
        autoComplete={'country'}
        type={'list'}
        placeholder="Select a country"
        list="country-list"
        register={register}
        errors={errors}
        touchedFields={touchedFields}
      />
      <datalist id="country-list">
        {countries.map((country) => (
          <option key={country}>{country}</option>
        ))}
      </datalist>
    </div>
  );
};

export default CountryAutocomplete;
