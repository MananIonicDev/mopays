import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  qrText;

  constructor(
    public platform: Platform,
    private qrScanner: QRScanner,
    private clipboard: Clipboard,
    public socialSharing: SocialSharing,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.qrText = params.special;
      }
    });
  }

  ngOnInit(){
  }

  startScanner(){
    this.router.navigate(['scan']);
  }

  shareLink(){
    //let url = 'https://mopays.app'
    this.socialSharing.share(this.qrText, null, null, null).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

  openLink(){
    window.open(this.qrText, '_blank')
  }

  copyLink(){
    this.clipboard.copy(this.qrText);
  }

}
