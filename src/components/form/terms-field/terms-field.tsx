// import {
//   FieldErrors,
//   FieldValues,
//   Path,
//   UseFormRegister,
//   UseFormStateReturn,
// } from 'react-hook-form';
import ErrorInformation from '../../error-information/error-information';
import { CheckboxButton } from '../../checkbox/checkbox';
import Input from '../../input/input';
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
//   terms: boolean;
// }

export const TermsField = ({
  // id,
  register,
  errors,
  touchedFields,
  // terms,
}: BaseFormProps) => {
  const id: FormFieldsNameType = FormFieldsName.terms;
  return (
    <div className="space-y-1 flex flex-col">
      <CheckboxButton htmlFor={id}>
        <Input
          id={id}
          type={'checkbox'}
          register={register}
          errors={errors}
          touchedFields={touchedFields}
        />
      </CheckboxButton>
      <ErrorInformation
        errors={errors}
        touchedFields={touchedFields}
        fields={[id]}
      />
    </div>
  );
};
