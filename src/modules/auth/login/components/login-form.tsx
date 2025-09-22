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

      <Divider sx={{ my: 2 }}>
        <Typography variant="body2" color="text.secondary">
          其他登录方式
        </Typography>
      </Divider>

      <Stack direction="row" spacing={2} justifyContent="center">
        <IconButton sx={{ color: '#1877F2' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"
            />
          </svg>
        </IconButton>
        <IconButton sx={{ color: '#1DA1F2' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23z"
            />
          </svg>
        </IconButton>
        <IconButton sx={{ color: '#DB4437' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 0 1 0-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0 0 12.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"
            />
          </svg>
        </IconButton>
      </Stack>
    </Box>
  );
}
