import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import { FooterActionControl } from 'pages/conference/components/footer/components';

export function FooterShareScreenControl() {
  return (
    <FooterActionControl icon={<ScreenShareIcon sx={{ fontSize: '30px' }} />} />
  );
}
