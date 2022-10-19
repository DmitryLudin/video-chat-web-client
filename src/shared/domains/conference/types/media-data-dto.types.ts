import {
  MediaKind,
  RtpCapabilities,
  RtpParameters,
} from 'mediasoup-client/lib/RtpParameters';
import { DtlsParameters } from 'mediasoup-client/lib/Transport';

export interface ICreateMediaDataDto {
  memberId: string;
}

export interface IConnectMediaStreamDto {
  memberId: string;
  transportId: string;
  dtlsParameters: DtlsParameters;
}

export interface ICreateMediaStreamProducerDto {
  memberId: string;
  transportId: string;
  kind: MediaKind;
  rtpParameters: RtpParameters;
  paused: false;
}

export interface IMediaStreamProducerTrack {
  track: {
    producerId: string;
  };
}

export interface IMediaStreamConsumerTrack {
  track: {
    id: string;
    kind: MediaKind;
    rtpParameters: RtpParameters;
    type: string;
    producerId: string;
    producerPaused: boolean;
  };
}

export interface ICreateMediaStreamConsumerDto {
  memberId: string;
  transportId: string;
  producerId: string;
  rtpCapabilities: RtpCapabilities;
  paused: true;
}

export interface IResumeMediaStreamConsumerDto {
  memberId: string;
  consumerId: string;
}
