import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps } from '@mui/material';

export interface SelectOption {
  label: string;
  value: string | number;
}

type ControlledSelectProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  options: SelectOption[];
} & Omit<SelectProps, 'name' | 'control' | 'options' | 'label' | 'value' | 'onChange' | 'onBlur' | 'ref'>;

/**
 * 一个通用的、受控的 MUI Select 组件，与 react-hook-form 集成。
 */
export const ControlledSelect = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  options,
  required,
  ...rest
}: ControlledSelectProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const labelId = `${name}-label`;
  const helperTextId = error ? `${name}-error-text` : undefined;

  return (
    <FormControl fullWidth error={!!error} required={required}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        label={label} // `label` prop 在 Select 中是为了计算 notched outline 的宽度
        value={field.value ?? ''}
        onChange={field.onChange}
        onBlur={field.onBlur}
        inputRef={field.ref}
        aria-describedby={helperTextId}
        {...rest}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText id={helperTextId}>{error.message}</FormHelperText>}
    </FormControl>
  );
};
