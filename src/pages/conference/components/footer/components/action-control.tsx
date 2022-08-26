import { Button } from '@mui/material';

type TProps = {
  icon: JSX.Element;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

export function FooterActionControl({ color, icon, onClick }: TProps) {
  return (
    <Button
      sx={{
        borderRadius: 3,
      }}
      onClick={onClick}
      color={color}
      variant="contained"
    >
      {icon}
    </Button>
  );
}
