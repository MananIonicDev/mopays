import { Component } from '@angular/core';
import {tracks} from '../../assets/radio';
import {Howl, Howler} from 'howler';
import {DomSanitizer} from '@angular/platform-browser';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-radios',
  templateUrl: 'radios.page.html',
  styleUrls: ['radios.page.scss'],
})
export class RadiosPage {
  radioList = tracks;
  selectedStation: any = tracks[0];
  player: any;
  index = 0;
  totalIndex = 12;
  constructor(private sanitization: DomSanitizer, public navCtrl: NavController) {
    const track = this.radioList[0];
    // this.selectedTrack(track);
  }

  selectedTrack(track) {
    this.selectedStation = track;
    this.play(this.selectedStation);
  }

  goBack(){
    this.navCtrl.pop()
  }

  getBackground(image) {
    return this.sanitization.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0.5), rgba(16, 16, 23, 0.6)), url(${image})`);
  }

  play(track) {
    if (this.player) {
      this.player.stop();
    }
    this.player = new Howl({
      src: [track.source],
      html5: true,
      format: ['mp3', 'aac']
    });
    this.player.play();
  }

  stop() {
    if (this.player) {
      this.player.stop();
      this.player = undefined;
    }
  }

  next() {
    if (this.index < 4) {
      this.index = this.index + 1;
      this.selectedTrack(this.radioList[this.index]);
    }
  }

  prev() {
    if (this.index > 0) {
      this.index = this.index - 1;
      this.selectedTrack(this.radioList[this.index]);
    }
  }
}