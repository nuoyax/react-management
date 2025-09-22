import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from '@mui/material';
import { getRouteApi } from '@tanstack/react-router';

const routeApi = getRouteApi('/_authenticated/pokemon/');

export function PokemonPagination({ total }: { total: number }) {
  const { page = 1 } = routeApi.useSearch() as Pagination;
  const navigate = routeApi.useNavigate();
  return (
    <div className="flex items-center justify-center">
      <span style={{ cursor: page <= 1 ? 'not-allowed' : 'unset' }}>
        <Button
          disabled={page <= 1}
          variant="contained"
          startIcon={<ArrowBackIosIcon />}
          onClick={() => {
            if (page > 1) {
              navigate({ search: { page: page - 1 } });
            }
          }}
        >
          前一页
        </Button>
      </span>
      <div className="mx-4">
        {page} / {total}
      </div>
      <span style={{ cursor: page >= total ? 'not-allowed' : 'unset' }}>
        <Button
          disabled={page >= total}
          variant="contained"
          endIcon={<ArrowForwardIosIcon />}
          onClick={() => {
            if (page < total) {
              navigate({ search: { page: page + 1 } });
            }
          }}
        >
          后一页
        </Button>
      </span>
    </div>
  );
}
