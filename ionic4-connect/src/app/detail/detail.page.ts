import { Component, NgZone } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BLE } from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage {
  peripheral: any = {};
  statusMessage: string;
  connect$: Subscription;

  constructor(
    public navCtrl: NavController,
    public activatedRoute: ActivatedRoute,
    private ble: BLE,
    private toastCtrl: ToastController,
    private ngZone: NgZone
  ) {
    const deviceId = activatedRoute.snapshot.queryParams.deviceId;
    this.setStatus('Connecting to ' + deviceId);

    this.connect$ = this.ble.connect(deviceId).subscribe(
      peripheral => this.onConnected(peripheral),
      peripheral => this.onDeviceDisconnected(peripheral)
    );
  }

  onConnected(peripheral) {
    this.ngZone.run(() => {
      this.setStatus('');
      this.peripheral = peripheral;
    });
  }

  onDeviceDisconnected(peripheral) {
    this.toastCtrl.create({
      message: 'The peripheral unexpectedly disconnected',
      duration: 3000,
      position: 'middle'
    }).then((toast) => toast.present());
  }

  // Disconnect peripheral when leaving the page
  ionViewWillLeave() {
    console.log('ionViewWillLeave disconnecting Bluetooth');

    // unsubscribing automatically calls disconnect and ignores the promise
    this.connect$.unsubscribe();
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }
}
