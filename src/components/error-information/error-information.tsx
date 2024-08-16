import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormStateReturn,
} from 'react-hook-form';

interface PropsType<T extends FieldValues> {
  fields: Path<T>[];
  errors: FieldErrors<T>;
  touchedFields: UseFormStateReturn<T>['touchedFields'];
}

const ErrorInformation = <T extends FieldValues>({
  touchedFields,
  errors,
  fields,
}: PropsType<T>) => {
  const getErrorMessage = (error: FieldErrors<T>[Path<T>]): string => {
    if (typeof error === 'string') {
      return error;
    } else if (error && typeof error === 'object' && 'message' in error) {
      return getErrorMessage(error.message as FieldErrors<T>[Path<T>]);
    } else {
      return 'Unknown error';
    }
  };
  const errorMessages = fields
    .map((field: Path<T>) => {
      const isTouched = Object.prototype.hasOwnProperty.call(
        touchedFields,
        field
      );
      const isHasError =
        (field === 'gender' && errors[field]) || (isTouched && errors[field]);
      const errorMessage = isHasError ? getErrorMessage(errors[field]) : '';
      return errorMessage;
    })
    .filter((message) => message !== '');

  return (
    <div className="h-4 mt-0">
      <p className="text-xs text-destructive error-message mt-1">
        {errorMessages[0]}
      </p>
    </div>
  );
};

export default ErrorInformation;
