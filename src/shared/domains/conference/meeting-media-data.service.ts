export {};
// import { RequestStore } from 'core';
// import { Device } from 'mediasoup-client';
// import { Consumer } from 'mediasoup-client/lib/Consumer';
// import {
//   MediaKind,
//   RtpCapabilities,
//   RtpParameters,
// } from 'mediasoup-client/lib/RtpParameters';
// import { DtlsParameters, Transport } from 'mediasoup-client/lib/Transport';
// import { IWebrtcTransportData } from 'shared/domains/conference/dto';
// import { IMeeting, IMember } from 'shared/domains/conference/models';
// import {
//   conferenceTransport,
//   ConferenceTransport,
//   conferenceWsTransport,
//   ConferenceWsTransport,
// } from 'shared/domains/conference/transports';
// import { TMediaData } from 'shared/domains/conference/types';
// import { userService, UserService } from 'shared/domains/user/user.service';
//
// type TMemberData = { memberId: string; roomId: string };
//
// type TTransportDto = TMemberData & {
//   transportData: IWebrtcTransportData;
// };
//
// type TStore = {
//   consumers: Consumer[];
// };
//
// const initialState: TStore = {
//   consumers: [],
// };
//
// export class MeetingMediaDataService {
//   private device?: Device;
//   private producerTransport?: Transport;
//   private consumerTransport?: Transport;
//
//   private readonly _store = new RequestStore<TStore>(initialState);
//
//   get store() {
//     return this._store.getStore();
//   }
//
//   constructor(
//     private readonly transport: ConferenceTransport,
//     private readonly wsTransport: ConferenceWsTransport,
//     private readonly userService: UserService
//   ) {}
//
//   async connect({
//     conference,
//     mediaData,
//   }: {
//     conference: IMeeting;
//     mediaData: TMediaData;
//   }) {
//     this.device = await this.loadDevice(mediaData.routerRtpCapabilities);
//
//     const member = conference.members.find(
//       (member) => member.user.id === this.userService.store.user?.id
//     ) as IMember;
//
//     this.producerTransport = this.createProduceTransport({
//       roomId: conference.id,
//       memberId: member.id,
//       transportData: mediaData.transports[0],
//     });
//
//     this.consumerTransport = this.createConsumeTransport({
//       roomId: conference.id,
//       memberId: member.id,
//       transportData: mediaData.transports[1],
//     });
//
//     this.wsTransport.sendGetTracks({ roomId: conference.id });
//   }
//
//   /********** Приватные методы **********/
//   private createProduceTransport({
//     roomId,
//     memberId,
//     transportData,
//   }: TTransportDto) {
//     try {
//       if (!this.device) return;
//
//       const producerTransport = this.device.createSendTransport(transportData);
//
//       this.subscribeConnectTransport(producerTransport, {
//         memberId,
//         roomId,
//       });
//
//       this.subscribeProduceTrack(producerTransport, { memberId, roomId });
//
//       this.subscribeConnectionStateChange(producerTransport);
//
//       return producerTransport;
//     } catch (error) {
//       console.log(error);
//     }
//   }
//
//   private createConsumeTransport({
//     roomId,
//     memberId,
//     transportData,
//   }: TTransportDto) {
//     try {
//       if (!this.device) return;
//
//       const consumerTransport = this.device.createRecvTransport(transportData);
//
//       this.subscribeConnectTransport(consumerTransport, {
//         memberId,
//         roomId,
//       });
//
//       this.subscribeConnectionStateChange(consumerTransport);
//
//       return consumerTransport;
//     } catch (error) {
//       console.log(error);
//     }
//   }
//
//   private async loadDevice(routerRtpCapabilities: RtpCapabilities) {
//     try {
//       const device = new Device();
//       await device.load({ routerRtpCapabilities });
//       return device;
//     } catch (error: unknown) {
//       const createDeviceError = error as { name: string };
//       if (createDeviceError.name === 'UnsupportedError') {
//         console.error('Browser not supported');
//         alert('Browser not supported');
//       }
//       console.error(error);
//     }
//   }
//
//   private subscribeConnectTransport(transport: Transport, data: TMemberData) {
//     transport.on(
//       'connect',
//       (
//         { dtlsParameters }: { dtlsParameters: DtlsParameters },
//         callback: () => void,
//         errback: (error: Error) => void
//       ) => {
//         this.transport
//           .connectMediaStream(data.roomId, {
//             dtlsParameters,
//             transportId: transport.id,
//             memberId: data.memberId,
//           })
//           .then(callback)
//           .catch(errback);
//       }
//     );
//   }
//
//   private subscribeProduceTrack(transport: Transport, data: TMemberData) {
//     transport.on(
//       'produce',
//       (
//         {
//           kind,
//           rtpParameters,
//         }: {
//           kind: MediaKind;
//           rtpParameters: RtpParameters;
//         },
//         callback: (data: { id: string }) => void,
//         errback: (error: Error) => void
//       ) => {
//         this.transport
//           .sendTrack(data.roomId, {
//             memberId: data.memberId,
//             kind,
//             transportId: transport.id,
//             rtpParameters,
//           })
//           .then((data) => callback({ id: data.track.producerId }))
//           .catch(errback);
//       }
//     );
//   }
//
//   private subscribeConnectionStateChange(transport: Transport) {
//     transport.on('connectionstatechange', (state) => {
//       switch (state) {
//         case 'connecting':
//           console.log('connecting');
//           break;
//
//         case 'connected':
//           console.log('connected');
//           break;
//
//         case 'failed':
//           console.log('failed');
//           transport.close();
//           break;
//
//         default:
//           break;
//       }
//     });
//   }
// }
//
// export const meetingMediaDataService = new MeetingMediaDataService(
//   conferenceTransport,
//   conferenceWsTransport,
//   userService
// );
