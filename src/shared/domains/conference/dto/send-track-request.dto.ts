import { MediaKind, RtpParameters } from 'mediasoup-client/lib/RtpParameters';

export interface ISendTrackRequestDto {
  memberId: string;
  transportId: string;
  kind: MediaKind;
  rtpParameters: RtpParameters;
}
