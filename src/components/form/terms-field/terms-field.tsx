import ErrorInformation from '../../error-information/error-information';
import { CheckboxButton } from '../../checkbox/checkbox';
import Input from '../../input/input';
import {
  BaseFormProps,
  FormFieldsName,
  FormFieldsNameType,
} from '../../../types';

export const TermsField = ({
  register,
  errors,
  touchedFields,
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
