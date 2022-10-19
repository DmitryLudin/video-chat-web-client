import { Device } from 'mediasoup-client';
import { Producer, ProducerOptions } from 'mediasoup-client/lib/Producer';
import {
  MediaKind,
  RtpCapabilities,
  RtpParameters,
} from 'mediasoup-client/lib/RtpParameters';
import {
  DtlsParameters,
  IceCandidate,
  IceParameters,
} from 'mediasoup-client/lib/Transport';
import { IMember, IRoom } from 'shared/domains/conference/models';

export type TMemberId = IMember['id'];
export type TRoomId = IRoom['id'];
export type TProducerId = Producer['id'];

interface IWebrtcTransportParams {
  id: string;
  iceParameters: IceParameters;
  iceCandidates: IceCandidate[];
  dtlsParameters: DtlsParameters;
}

export type TMemberData = { memberId: string; roomId: string };

export interface IMediaData {
  routerRtpCapabilities: RtpCapabilities;
  transports: Array<IWebrtcTransportParams>;
}

export interface IRoomMediaDataDto {
  roomId: TRoomId;
  memberId: TMemberId;
  mediaData: IMediaData;
}

export interface INewMediaStreams {
  tracks: Array<TCreateConsumer>;
}

export type TTransportDto = TMemberData & {
  device: Device;
  transportParams: IWebrtcTransportParams;
};

export type TMediaStreamTransportConnect = { dtlsParameters: DtlsParameters };

export type TMediaStreamProduce = {
  kind: MediaKind;
  rtpParameters: RtpParameters;
};

export type TCreateProducer = {
  track: Omit<MediaStreamTrack, 'kind'> & { kind: MediaKind | string };
};

export type TCreateConsumer = {
  producerId: TProducerId;
  memberId: TMemberId;
  mediaKind: MediaKind;
};
