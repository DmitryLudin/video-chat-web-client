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

export interface IMediaStreamProducer {
  producerId: string;
}

export interface IMediaStreamConsumer {
  id: string;
  kind: MediaKind;
  rtpParameters: RtpParameters;
  type: string;
  producerId: string;
  producerPaused: boolean;
}

export interface ICreateMediaStreamConsumerDto {
  memberId: string;
  transportId: string;
  producerId: string;
  rtpCapabilities: RtpCapabilities;
  paused: boolean;
}

export interface IResumeMediaStreamConsumerDto {
  memberId: string;
  consumerId: string;
}

export interface IPauseResumeMediaStreamDto {
  roomId: string;
  memberId: string;
  producerId: string;
  kind: MediaKind;
}

export interface IActiveSpeakerDto {
  memberId: string;
}

export interface IRemoteMediaData {
  membersMediaData: Array<{
    memberId: string;
    streams: Array<{
      producerId: string;
      mediaKind: MediaKind;
      isPaused: boolean;
    }>;
  }>;
}
