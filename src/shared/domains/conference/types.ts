import { RtpCapabilities } from 'mediasoup-client/lib/RtpParameters';
import { IWebrtcTransportData } from 'shared/domains/conference/dto';
import { IRoom, IMessage } from 'shared/domains/conference/models';

export type TMediaData = {
  routerRtpCapabilities: RtpCapabilities;
  transports: IWebrtcTransportData[];
};

type TJoinConferenceBase = {
  mediaData: TMediaData;
};

export type TJoinConferenceCallback = TJoinConferenceBase & {
  room: IRoom;
};

export type TJoinConferenceResponse = TJoinConferenceBase & {
  room: IRoom;
};
