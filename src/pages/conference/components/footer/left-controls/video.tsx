import VideocamIcon from '@mui/icons-material/Videocam';
import { FooterActionControl } from 'pages/conference/components/footer/components';

export function FooterVideoControl() {
  return (
    <FooterActionControl icon={<VideocamIcon sx={{ fontSize: '30px' }} />} />
  );
}
