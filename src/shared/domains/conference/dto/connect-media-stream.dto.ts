import { DtlsParameters } from 'mediasoup-client/lib/Transport';

export interface IConnectMediaStreamDto {
  memberId: string;
  transportId: string;
  dtlsParameters: DtlsParameters;
}
