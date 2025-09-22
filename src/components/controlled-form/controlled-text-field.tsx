import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

export type ControlledTextFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
} & Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'error'>;

/** 一个通用的、受控的 MUI TextField 组件，与 react-hook-form 集成。*/
export const ControlledTextField = <TFieldValues extends FieldValues>({
  name,
  control,
  ...rest
}: ControlledTextFieldProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <TextField
      {...field}
      {...rest}
      inputRef={field.ref}
      error={!!error}
      helperText={error ? error.message : rest.helperText}
    />
  );
};
