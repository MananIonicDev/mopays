import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  scanSub: any;

  constructor(
    private qrScanner: QRScanner,
    public toastCtrl: ToastController,
    public router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.scan();
  }
  ionViewWillLeave() {
    this.stopScanning();
  }

  scan() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.qrScanner.show();
          this.scanSub = this.qrScanner.scan().subscribe((text:string) => {
            let navigationExtras: NavigationExtras = {
              queryParams: {
                special: text
              }
            };
            this.router.navigate(['scanner'], navigationExtras);
          });
        } else {
          console.error('Permission Denied', status);
        }
      })
      .catch((e: any) => {
        console.error('Error', e);
      });
  }

  stopScanning() {
    (this.scanSub) ? this.scanSub.unsubscribe() : null;
    this.scanSub = null;
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    this.qrScanner.hide();
    this.qrScanner.destroy();
  }

}
