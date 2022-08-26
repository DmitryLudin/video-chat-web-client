import MicIcon from '@mui/icons-material/Mic';
import { FooterActionControl } from 'pages/conference/components/footer/components';

export function FooterMicrophoneControl() {
  return <FooterActionControl icon={<MicIcon sx={{ fontSize: '30px' }} />} />;
}
