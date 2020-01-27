import { Component, NgZone } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BLE } from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  devices: any[] = [];
  statusMessage: string;
  scan$: Subscription;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private ble: BLE,
    private ngZone: NgZone
  ) { }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.scan();
  }

  scan() {
    this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list

    // scan for any Bluetooth LE devices
    this.scan$ = this.ble.startScan([]).subscribe(
      device => this.onDeviceDiscovered(device),
      error => this.scanError(error)
    );

    setTimeout(() => {
      // unsubscribe automatically calls stopScan
      this.scan$.unsubscribe();
      this.setStatus('Scan complete');
    }, 5000);

  }

  onDeviceDiscovered(device) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
    });
  }

  // If location permission is denied, you'll end up here
  scanError(error) {
    this.setStatus('Error ' + error);
    this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
    }).then((toast) => toast.present());
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  deviceSelected(deviceId) {
    console.log('device ID ' + JSON.stringify(deviceId) + ' selected');
    this.navCtrl.navigateForward(['/detail'], {
      queryParams: { deviceId }
    });
  }
}
