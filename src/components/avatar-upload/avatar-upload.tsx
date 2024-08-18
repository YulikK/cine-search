import ErrorInformation from '../error-information/error-information';
import Input from '../input/input';
import { useState } from 'react';
import { BaseFormProps, FormFieldsName, FormFieldsNameType } from '../../types';

export const AvatarUpload = ({
  register,
  errors,
  touchedFields,
}: BaseFormProps) => {
  const [base64Image, setBase64Image] = useState<string>('');
  const id: FormFieldsNameType = FormFieldsName.avatar;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setBase64Image(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Avatar
      </p>
      <div className="flex items-center gap-2">
        <div className="bg-white rounded-full w-12 h-12 overflow-hidden flex justify-center items-center">
          <img
            className=" w-full"
            src={base64Image || 'icons/user.png'}
            alt="Avatar Preview"
          />
        </div>
        <label
          htmlFor={id}
          className=" h-10 w-10 cursor-pointer border hover:bg-accent text-muted-foreground hover:text-white font-bold  rounded-lg flex flex-col items-center justify-center"
        >
          <Input
            id={id}
            type={'file'}
            register={register}
            accept={'.jpeg,.jpg,.png'}
            errors={errors}
            touchedFields={touchedFields}
            onChangeHandler={handleFileChange}
          />
          <img className="h-5 w-5" src="/icons/upload.png" alt="Upload" />
        </label>
      </div>
      <ErrorInformation
        errors={errors}
        touchedFields={touchedFields}
        fields={[id]}
      />
    </div>
  );
};
