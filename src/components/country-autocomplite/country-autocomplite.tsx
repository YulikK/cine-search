import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Label } from '../label/label';
import Input from '../input/input';
import { BaseFormProps, FormFieldsNameType } from '../../types';

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
