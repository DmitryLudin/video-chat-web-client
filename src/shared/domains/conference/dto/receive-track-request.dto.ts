import { RtpCapabilities } from 'mediasoup-client/lib/RtpParameters';

export interface IReceiveTrackRequestDto {
  memberId: string;
  transportId: string;
  producerId: string;
  rtpCapabilities: RtpCapabilities;
}
