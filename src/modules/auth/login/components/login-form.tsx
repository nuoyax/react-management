import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';
import { z } from 'zod';
import { ControlledTextField } from '~/components/controlled-form';
import { userAtom } from '~/modules/auth/store';

const formSchema = z.object({
  username: z.string().min(1, { message: '用户名不能为空' }),
  password: z.string().min(1, { message: '密码不能为空' }),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm() {
  const setUser = useSetAtom(userAtom);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  });

  const navigate = useNavigate();

  const onSubmit = handleSubmit(data => {
    setUser({
      id: '1',
      username: data.username,
    });
    const to = new URLSearchParams(location.search).get('redirectTo') || '/';
    navigate({ to });
  });

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <Box component="form" onSubmit={onSubmit} className="flex flex-col gap-4">
      <ControlledTextField
        name="username"
        control={control}
        label="用户名"
        size="medium"
        required
        fullWidth
        placeholder="请输入用户名"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon color="primary" />
              </InputAdornment>
            ),
          },
        }}
      />

      <ControlledTextField
        name="password"
        control={control}
        label="密码"
        type={showPassword ? 'text' : 'password'}
        size="medium"
        required
        fullWidth
        placeholder="请输入密码"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color="primary" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={toggleShowPassword} edge="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              color="primary"
              size="small"
            />
          }
          label={<Typography variant="body2">记住我</Typography>}
        />
        <Link href="#" variant="body2" underline="hover" color="primary">
          忘记密码？
        </Link>
      </Stack>

      <Button type="submit" size="large" variant="contained" fullWidth sx={{ mt: 2, py: 1.5 }}>
        登录
      </Button>


    </Box>
  );
}
