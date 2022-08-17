import {
  DtlsParameters,
  IceCandidate,
  IceParameters,
} from 'mediasoup-client/lib/Transport';

export interface IWebrtcTransportData {
  id: string;
  iceParameters: IceParameters;
  iceCandidates: IceCandidate[];
  dtlsParameters: DtlsParameters;
}
