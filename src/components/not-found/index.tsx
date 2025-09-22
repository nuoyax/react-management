import { Box, Button, Stack, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';
import NotFoundSvg from '~/assets/images/404.svg';

export function NotFound() {
  return (
    <Stack className="mx-auto h-screen w-[448px] items-center justify-center px-3">
      <Typography variant="h4" sx={{ mb: 2 }}>
        Sorry, page not found!
      </Typography>
      <Typography variant="body1" color="textSecondary" textAlign="center">
        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your
        spelling.
      </Typography>
      <Box
        component="img"
        src={NotFoundSvg}
        sx={{
          width: 320,
          height: 'auto',
          my: { xs: 5, sm: 10 },
        }}
      />
      <Button component={Link} to="/">
        Go to home
      </Button>
    </Stack>
  );
}
