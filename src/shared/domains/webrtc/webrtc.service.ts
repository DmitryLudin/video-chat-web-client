export {};
// import { RequestStore } from 'core';
// import { Device } from 'mediasoup-client';
// import { Consumer } from 'mediasoup-client/lib/Consumer';
// import { ProducerOptions } from 'mediasoup-client/lib/Producer';
// import {
//   MediaKind,
//   RtpCapabilities,
//   RtpParameters,
// } from 'mediasoup-client/lib/RtpParameters';
// import { DtlsParameters, Transport } from 'mediasoup-client/lib/Transport';
// import { IMeeting, IMember } from 'shared/domains/conference/models';
// import {
//   conferenceTransport,
//   ConferenceTransport,
//   conferenceWsTransport,
//   ConferenceWsTransport,
// } from 'shared/domains/conference/transports';
// import { userService, UserService } from 'shared/domains/user/user.service';
// import { MediaType } from 'shared/domains/webrtc/constants';
//
// type TWebRtcStore = {
//   consumers: Consumer[];
// };
//
// const initialWebRtcState: TWebRtcStore = {
//   consumers: [],
// };
//
// export class WebRtcService {
//   device!: Device;
//   producerTransport!: Transport;
//   consumerTransport!: Transport;
//
//   private readonly _store = new RequestStore<TWebRtcStore>(initialWebRtcState);
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
//     meeting,
//     routerRtpCapabilities,
//   }: {
//     meeting: IMeeting;
//     routerRtpCapabilities: RtpCapabilities;
//   }) {
//     await this.loadDevice(routerRtpCapabilities);
//     const member = meeting.members.find(
//       (member) => member.user.id === this.userService.store.user?.id
//     ) as IMember;
//
//     await Promise.all([
//       this.createProduceTransport(meeting.id, member.id),
//       this.createConsumeTransport(meeting.id, member.id),
//     ]);
//
//     this.wsTransport.sendGetMembers({ meetingId: meeting.id });
//   }
//
//   async produce(mediaType: MediaType) {
//     let mediaConstraints: MediaStreamConstraints = {};
//     const isAudio = mediaType === MediaType.AUDIO;
//     const isScreen = mediaType === MediaType.SCREEN;
//
//     switch (mediaType) {
//       case MediaType.AUDIO:
//         mediaConstraints = {
//           audio: true,
//           video: false,
//         };
//         break;
//       case MediaType.VIDEO:
//         mediaConstraints = {
//           audio: false,
//           video: {
//             width: {
//               min: 640,
//               ideal: 1920,
//             },
//             height: {
//               min: 400,
//               ideal: 1080,
//             },
//           },
//         };
//         break;
//       default:
//         return;
//     }
//
//     if (!this.device.canProduce('video') && !isAudio) {
//       console.error('Cannot produce video');
//       return;
//     }
//
//     let stream;
//     try {
//       stream = isScreen
//         ? await navigator.mediaDevices.getDisplayMedia()
//         : await navigator.mediaDevices.getUserMedia(mediaConstraints);
//
//       const track = isAudio
//         ? stream.getAudioTracks()[0]
//         : stream.getVideoTracks()[0];
//
//       const params: ProducerOptions = {
//         track,
//       };
//
//       if (!isAudio && !isScreen) {
//         params.encodings = [
//           {
//             rid: 'r0',
//             maxBitrate: 100000,
//             scalabilityMode: 'S1T3',
//           },
//           {
//             rid: 'r1',
//             maxBitrate: 300000,
//             scalabilityMode: 'S1T3',
//           },
//           {
//             rid: 'r2',
//             maxBitrate: 900000,
//             scalabilityMode: 'S1T3',
//           },
//         ];
//
//         params.codecOptions = {
//           videoGoogleStartBitrate: 1000,
//         };
//       }
//       const producer = await this.producerTransport.produce(params);
//
//       console.log('Producer', producer);
//
//       producer.on('trackended', () => {
//         console.log('track ended');
//       });
//
//       producer.on('transportclose', () => {
//         console.log('Producer transport close');
//       });
//
//       producer.on('close', () => {
//         console.log('Closing producer');
//       });
//     } catch (err) {
//       console.log('Produce error:', err);
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
//   private async createProduceTransport(meetingId: string, memberId: string) {
//     try {
//       const transportData = await this.transport.createWebRtcTransport(
//         meetingId,
//         { memberId }
//       );
//
//       this.producerTransport = this.device.createSendTransport(transportData);
//
//       this.producerTransport.on(
//         'connect',
//         (
//           { dtlsParameters }: { dtlsParameters: DtlsParameters },
//           callback: () => void,
//           errback: (error: Error) => void
//         ) => {
//           this.transport
//             .connectWebRtcTransport(meetingId, {
//               dtlsParameters,
//               memberId,
//             })
//             .then(callback)
//             .catch(errback);
//         }
//       );
//
//       this.producerTransport.on(
//         'produce',
//         (
//           {
//             kind,
//             rtpParameters,
//           }: {
//             kind: MediaKind;
//             rtpParameters: RtpParameters;
//           },
//           callback: (data: { id: string }) => void,
//           errback: (error: Error) => void
//         ) => {
//           this.transport
//             .createWebRtcProducer(meetingId, {
//               memberId,
//               kind,
//               rtpParameters,
//             })
//             .then((data) => callback({ id: data.producerId }))
//             .catch(errback);
//         }
//       );
//
//       this.producerTransport.on('connectionstatechange', (state) => {
//         switch (state) {
//           case 'connecting':
//             console.log('connecting');
//             break;
//
//           case 'connected':
//             console.log('connected');
//             break;
//
//           case 'failed':
//             console.log('failed');
//             this.producerTransport?.close();
//             break;
//
//           default:
//             break;
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }
//
//   private async createConsumeTransport(meetingId: string, memberId: string) {
//     try {
//       const transportData = await this.transport.createWebRtcTransport(
//         meetingId,
//         { memberId, isConsumeTransport: true }
//       );
//       this.consumerTransport = this.device.createRecvTransport(transportData);
//
//       this.consumerTransport.on(
//         'connect',
//         (
//           { dtlsParameters }: { dtlsParameters: DtlsParameters },
//           callback: () => void,
//           errback: (error: unknown) => void
//         ) => {
//           this.transport
//             .connectWebRtcTransport(meetingId, {
//               dtlsParameters,
//               memberId,
//               isConsumeTransport: true,
//             })
//             .then(callback)
//             .catch(errback);
//         }
//       );
//
//       this.consumerTransport.on('connectionstatechange', (state) => {
//         switch (state) {
//           case 'connecting':
//             console.log(state);
//             break;
//
//           case 'connected':
//             console.log(state);
//             break;
//
//           case 'failed':
//             console.log(state);
//             this.consumerTransport?.close();
//             break;
//
//           default:
//             break;
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }
//
// export const webRtcService = new WebRtcService(
//   conferenceTransport,
//   conferenceWsTransport,
//   userService
// );
