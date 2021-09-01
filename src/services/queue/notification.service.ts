import { Injectable } from '@nestjs/common';
import firebase from 'firebase-admin';
import { KeysService } from '../../config/key.service';

@Injectable()
export class NotificationService {
  public readonly firebaseInstance = firebase;
  constructor(private readonly configService: KeysService) {
    this.firebaseInstance.initializeApp({
      //@ts-ignore
      credential: firebase.credential.cert(this.configService.KEYS.FCM),
    });
  }

  public sendMessage(
    token: string,
    message?: string,
    payload?: { demo: 'demo'    }
  ): Promise<string> {
    return this.firebaseInstance.messaging().send({
      token,
      notification: {
        body: message,
      },
      data: payload,
    });
  }

  public async multiCastMessage(
    tokens: string[],
    message?: string,
    payload?: { demo: 'demo'   }
  ): Promise<firebase.messaging.BatchResponse> {
    return this.firebaseInstance.messaging().sendMulticast({
      tokens,
      notification: {
        body: message,
      },
      data: payload,
    });
  }
}
