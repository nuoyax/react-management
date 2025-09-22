import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { Autocomplete, AutocompleteProps, type AutocompleteValue, CircularProgress, TextField } from '@mui/material';

export type ControlledAutocompleteProps<
  TFieldValues extends FieldValues,
  TOption,
  TMultiple extends boolean | undefined = false,
  TDisableClearable extends boolean | undefined = false,
  TFreeSolo extends boolean | undefined = false,
> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  options: TOption[];
  loading?: boolean;
  helperText?: string;
  required?: boolean;
} & Omit<
  AutocompleteProps<TOption, TMultiple, TDisableClearable, TFreeSolo>,
  'options' | 'renderInput' | 'value' | 'onChange' | 'loading'
>;

/**
 * A generic, type-safe, controlled MUI Autocomplete component for use with react-hook-form.
 */
export const ControlledAutocomplete = <
  TFieldValues extends FieldValues,
  TOption,
  TMultiple extends boolean | undefined = false,
  TDisableClearable extends boolean | undefined = false,
  TFreeSolo extends boolean | undefined = false,
>({
  name,
  control,
  options,
  label,
  loading,
  required,
  ...rest
}: ControlledAutocompleteProps<TFieldValues, TOption, TMultiple, TDisableClearable, TFreeSolo>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <Autocomplete
      value={field.value as AutocompleteValue<TOption, TMultiple, TDisableClearable, TFreeSolo>}
      onChange={(_, newValue) => {
        field.onChange(newValue);
      }}
      onBlur={field.onBlur}
      options={options}
      loading={loading}
      {...rest}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          inputRef={field.ref}
          error={!!error}
          required={required}
          helperText={error ? error.message : rest.helperText}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  );
};
