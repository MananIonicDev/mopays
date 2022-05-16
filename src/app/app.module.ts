import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireModule } from "@angular/fire";
import { firebaseConfig } from "./firebase.config";
import * as firebase from 'firebase';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { Network } from '@ionic-native/network/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Market } from '@ionic-native/market/ngx';
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    //IonicModule.forRoot({ mode: 'ios', backButtonText: '' }), 
    HttpClientModule,
    SuperTabsModule.forRoot(),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AppRoutingModule],
  providers: [
    StatusBar,
    Camera,
    OneSignal,
    AppAvailability,
    EmailComposer,
    AppRate,
    SocialSharing,
    QRScanner,
    Clipboard,
    Geolocation,
    InAppBrowser,
    Facebook,
    AppVersion,
    NativeAudio,
    Network,
    Market,
    LaunchNavigator,
    PhotoViewer,
    CallNumber,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
