import { Device } from 'mediasoup-client';
import {
  MediaKind,
  RtpCapabilities,
  RtpParameters,
} from 'mediasoup-client/lib/RtpParameters';
import {
  DtlsParameters,
  IceCandidate,
  IceParameters,
  Transport,
} from 'mediasoup-client/lib/Transport';
import { MediaStreamService } from 'shared/domains/conference/domains/media-data/services/media-stream.service';
import {
  MediaDataTransport,
  MediaDataWsTransport,
} from 'shared/domains/conference/domains/media-data/transports';
import { IMember, IRoom } from 'shared/domains/conference/models';

export type TMemberId = IMember['id'];
export type TRoomId = IRoom['id'];

export interface IWebrtcTransportParams {
  id: string;
  iceParameters: IceParameters;
  iceCandidates: IceCandidate[];
  dtlsParameters: DtlsParameters;
}

export interface IRoomMediaDataDto {
  roomId: TRoomId;
  memberId: TMemberId;
  mediaData: {
    routerRtpCapabilities: RtpCapabilities;
    transports: Array<IWebrtcTransportParams>;
  };
}

export type TMediaStreamTransportConnect = { dtlsParameters: DtlsParameters };

export type TMediaStreamProduce = {
  kind: MediaKind;
  rtpParameters: RtpParameters;
};

export type TMediaStreamConstructor = {
  meta: TMeta;
  webRtcTransport: Transport;
  httpTransport: MediaDataTransport;
  wsTransport: MediaDataWsTransport;
  device: Device;
};

export type TMeta = {
  roomId: TRoomId;
  selfMemberId: TMemberId;
};

export type TRemoteMemberMediaData = {
  memberId: string;
  streams: Array<{ producerId: string; mediaKind: MediaKind }>;
};

export interface IMediaStreamService extends MediaStreamService {
  init(data?: unknown): Promise<void>;
  streamPause(mediaKind: MediaKind): void;
  streamResume(mediaKind: MediaKind): void;
}
