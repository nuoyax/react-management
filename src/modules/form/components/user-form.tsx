import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button } from '@mui/material';
import { motion } from 'motion/react';
import { z } from 'zod';
import {
  ControlledAutocomplete,
  ControlledSelect,
  ControlledTextField,
  type SelectOption,
} from '~/components/controlled-form';

const formSchema = z.object({
  firstName: z.string().min(1, { message: '请输入名字' }).min(2, { message: '名字至少需要2个字符' }),
  email: z.string().min(1, { message: '请输入邮箱地址' }).email({ message: '请输入有效的邮箱地址' }),
  password: z.string().min(1, { message: '请输入密码' }).min(8, { message: '密码至少需要8个字符' }),
  country: z.object({ code: z.string(), label: z.string() }).nullable(),
  technologies: z.array(z.string()).min(1, '请至少选择一项技术'),
  role: z.string().min(1, { message: '请选择一个角色' }),
});

type FormValues = z.infer<typeof formSchema>;

interface CountryOption {
  code: string;
  label: string;
}

const countryOptions: CountryOption[] = [
  { code: 'CN', label: 'China' },
  { code: 'US', label: 'United States' },
  { code: 'JP', label: 'Japan' },
  { code: 'DE', label: 'Germany' },
];

const roleOptions: SelectOption[] = [
  { label: '管理员', value: 'admin' },
  { label: '开发者', value: 'developer' },
  { label: '访客', value: 'guest' },
];

const techOptions = ['React', 'Vue', 'Angular', 'Svelte', 'SolidJS'];

export const UserForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      email: '',
      password: '',
      country: null,
      technologies: [],
      role: '',
    },
    resolver: zodResolver(formSchema),
    // 性能优化：只在 blur 和 submit 时触发校验
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FormValues> = data => {
    return new Promise(resolve => {
      setTimeout(() => {
        alert(JSON.stringify(data, null, 2));
        resolve('表单提交成功');
      }, 1000);
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex max-w-[400px] flex-col gap-2 p-2"
      autoComplete="off"
      noValidate
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <ControlledTextField name="firstName" control={control} label="名字" fullWidth required />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <ControlledTextField name="email" control={control} label="邮箱地址" type="email" fullWidth required />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <ControlledTextField name="password" control={control} label="密码" type="password" fullWidth required />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <ControlledAutocomplete<FormValues, CountryOption>
          name="country"
          control={control}
          options={countryOptions}
          label="国家"
          getOptionLabel={option => option.label}
          isOptionEqualToValue={(option, value) => option.code === value.code}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <ControlledAutocomplete<FormValues, string, true>
          multiple
          name="technologies"
          control={control}
          options={techOptions}
          label="使用的技术"
          required
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <ControlledSelect<FormValues>
          name="role"
          control={control}
          label="用户角色"
          options={roleOptions}
          size="small"
          required
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? '提交中...' : '提交'}
        </Button>
      </motion.div>
    </Box>
  );
};
