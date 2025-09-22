import { createFileRoute } from '@tanstack/react-router';
import { NotFound } from '~/components/not-found';

export const Route = createFileRoute('/(error)/not-found')({
  component: NotFound,
});
