import { MediaKind, RtpParameters } from 'mediasoup-client/lib/RtpParameters';
type ConsumerType = 'simple' | 'simulcast' | 'svc' | 'pipe';

export interface IReceiveTrackDto {
  id: string;
  kind: MediaKind;
  rtpParameters: RtpParameters;
  type: ConsumerType;
  producerId: string;
  producerPaused: boolean;
}
