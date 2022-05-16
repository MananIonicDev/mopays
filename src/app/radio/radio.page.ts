import { Component, OnInit, ViewChild } from '@angular/core';
import { Html5Audio } from '../services/audio';
import * as firebase from 'firebase/app';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
//import { IonRange } from '@ionic/angular';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.page.html',
  styleUrls: ['./radio.page.scss'],
})
export class RadioPage implements OnInit {

  public advertRef = firebase.database().ref('Adverts/')
  adverts = [];

  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  };

  slideOpts = {
    autoplay: true,
    zoom: false,
    effect: 'flip'
  };


  stations = [
    {
      name: "Dance",
      url: "http://stream.dancewave.online:8080/dance.mp3"
    },
    {
      name: "GrindFM",
      url: "http://radio.goha.ru:8000/grindfm.ogg"
    },
    {
      name: "Nashe",
      url: "http://nashe1.hostingradio.ru:80/nashe-128.mp3"
    }
  ]

  /*@ViewChild("range", {static: false}) range: IonRange;
  currTitle;
  currSubtitle;
  currImage;
  progress = 0;
  isPlaying = false;
  isTouched = false;
  currSecsText;
  durationText;
  currRangeTime;
  maxRangeValue;
  currSong: HTMLAudioElement;
  upNextImg;
  upNextTitle;
  upNextSubTitle;*/

  radioList = [
    {
      name: 'RADIO PLUS',
      artist: 'online',
      cover: 'https://cdn.onlineradiobox.com/img/logo/9/33989.v5.png',
      source: 'https://stream.radio.co/s8cc7a5da4/listen',
      icon: 'https://cdn.onlineradiobox.com/img/logo/9/33989.v5.png',
      url: 'https://www.youtube.com/watch?v=z3wAjJXbYzA',
      favorited: false
    },
    {
      name: 'TOP FM',
      artist: 'online',
      cover: 'assets/radio/top.png',
      source: 'https://s1.radioforge.com:4433/topfmlive/stream',
      icon: 'assets/radio/top.png',
      url: 'https://www.youtube.com/watch?v=me6aoX0wCV8',
      favorited: true
    },
    {
      name: 'WAZAA FM',
      artist: 'online',
      cover: 'assets/radio/wazza.jpg',
      source: 'https://wazaafm.ice.infomaniak.ch/wazaafm-192.mp3',
      icon: 'assets/radio/wazza.jpg',
      url: 'https://www.youtube.com/watch?v=z3wAjJXbYzA',
      favorited: false
    },
    {
      name: 'HIT FM',
      artist: 'online',
      cover: 'assets/radio/hit.png',
      source: 'http://node-35.zeno.fm/hgb5sm8p4gruv?rj-ttl=5&rj-tok=AAABdL7IGKwAIieU2O-ik1esiA',
      icon: 'assets/radio/hit.png',
      url: 'https://www.youtube.com/watch?v=00-Rl3Jlx-o',
      favorited: false
    },
    {
      name: 'Radio230',
      artist: 'online',
      cover: 'assets/radio/radio230.jpg',
      source: 'https://streamingv2.shoutcast.com/Radio230webradio',
      icon: 'assets/radio/radio.jpg',
      url: 'https://www.youtube.com/watch?v=0WlpALnQdN8',
      favorited: true
    },
    {
      name: 'CAPITAL FM',
      artist: 'online',
      cover: 'assets/capital.png',
      source: 'https://media-ssl.musicradio.com/CapitalUK',
      icon: 'https://cdn.onlineradiobox.com/img/logo/2/34262.v2.png',
      url: 'https://www.youtube.com/watch?v=z3wAjJXbYzA',
      favorited: false
    },
    {
      name: 'THE RANGE 95.3 FM TEXAS',
      artist: 'online',
      cover: 'assets/range.png',
      source: 'https://radio30.virtualtronics.com/proxy/viejaguardia?mp=/stream',
      icon: 'http://cdn.onlineradiobox.com/img/logo/2/34102.v7.png',
      url: 'https://www.youtube.com/watch?v=z3wAjJXbYzA',
      favorited: false
    },
    {
      name: 'MKB INTERNATIONAL RADIO',
      artist: 'online',
      cover: 'assets/mkb.png',
      source: 'https://servidor40-3.brlogic.com:7218/live',
      icon: 'assets/radio/nrj-maurice.png',
      url: 'https://www.youtube.com/watch?v=z3wAjJXbYzA',
      favorited: false
    },
    {
      name: 'BBC',
      artist: 'online',
      cover: 'assets/radio/bbc.png',
      source: 'https://stream.live.vc.bbcmedia.co.uk/bbc_world_service',
      icon: 'assets/radio/bbc.png',
      url: 'https://www.youtube.com/watch?v=00-Rl3Jlx-o',
      favorited: false
    },
    {
      name: 'RFI Afrique',
      artist: 'online',
      cover: 'assets/radio/rfi.jpg',
      source: 'https://rfiafrique64k.ice.infomaniak.ch/rfiafrique-64.mp3',
      icon: 'assets/radio/rfi.jpg',
      url: 'https://www.youtube.com/watch?v=00-Rl3Jlx-o',
      favorited: false
    },
    {
      name: 'RADIO MIRCHI',
      artist: 'online',
      cover: 'assets/radio/mirchi.jpg',
      source: 'http://peridot.streamguys.com:7150/Mirchi',
      icon: 'assets/radio/mirchi.jpg',
      url: 'https://www.youtube.com/watch?v=00-Rl3Jlx-o',
      favorited: false
    },
    {
      name: 'DEEP HOUSE LOUNGE',
      artist: 'online',
      cover: 'assets/radio/deep.jpg',
      source: 'http://198.15.94.34:8006/stream',
      icon: 'assets/radio/deep.jpg',
      url: 'https://www.youtube.com/watch?v=00-Rl3Jlx-o',
      favorited: false
    },
    {
      name: 'MANGO RADIO',
      artist: 'online',
      cover: 'assets/radio/mango.jpg',
      source: 'https://mangoradio.stream.laut.fm/mangoradio?t302=2021-07-07_04-26-49&uuid=d2d8fd28-d607-4487-bfae-901f494dfb81',
      icon: 'assets/radio/mango.jpg',
      url: 'https://www.youtube.com/watch?v=00-Rl3Jlx-o',
      favorited: false
    },
    {
      name: 'Soma FM Groove Salad',
      artist: 'online',
      cover: 'assets/radio/groove.jpg',
      source: 'http://ice3.somafm.com/groovesalad-128-mp3',
      icon: 'assets/radio/groove.jpg',
      url: 'https://www.youtube.com/watch?v=00-Rl3Jlx-o',
      favorited: false
    },
  ]

  constructor(private player: Html5Audio, private theInAppBrowser: InAppBrowser) { }

  ngOnInit() {
    this.advertRef.orderByChild('type').equalTo('radio').once('value', adverts => {
      let advertsList = [];
      adverts.forEach(data => {
        advertsList.push({
          id: data.key,
          image: data.val().image,
          type: data.val().type,
          name: data.val().name,
          url: data.val().url,
          description: data.val().description
        })
      });
      this.adverts = advertsList
    });
  }

  ionViewDidEnter() {
    this.player = new Html5Audio();
  }

  play(url: string) {
    if (this.player.isPlaying){
      this.player.stop();
    }
    this.player.play(url);
  }

  stop() {
    if (this.player.isPlaying){
      this.player.stop();
    }
  }

  goAdsDetails(url) {
    //window.open(url, '_blank')
    let target = "_blank";
    this.theInAppBrowser.create(url, target, this.options);
  }

  /*playRadio(title, subtile, img, song){
      if(this.currSong != null){
          this.currSong.pause();
      }
      document.getElementById("fullPlayer").style.bottom = "0px";
      this.currTitle = title;
      this.currSubtitle = subtile;
      this.currImage = img;
      this.currSong = new Audio(song);

      this.currSong.play().then(()=> {
        this.durationText = this.sToTime(this.currSong.duration);
        this.maxRangeValue = Number(this.currSong.duration.toFixed(2).toString().substring(0, 5));
        var index = this.radioList.findIndex(x => x.name == this.currTitle);

        if((index + 1) == this.radioList.length){
            this.upNextImg = this.radioList[0].cover;
            this.upNextTitle = this.radioList[0].name;
            this.upNextSubTitle = this.radioList[0].artist;
        } 
          else {
            this.upNextImg = this.radioList[index + 1].cover;
            this.upNextTitle = this.radioList[index + 1].name;
            this.upNextSubTitle = this.radioList[index + 1].artist;
          }
          this.isPlaying = true;
      })
         this.currSong.addEventListener("timeupdate", () => {
             if(!this.isTouched){
                 this.currRangeTime = Number(this.currSong.currentTime.toFixed(2).toString().substring(0, 5));
                 this.currSecsText = this.sToTime(this.currSong.currentTime);
                 this.progress = (Math.floor(this.currSong.currentTime) / Math.floor(this.currSong.duration));

                 if(this.currSong.currentTime == this.currSong.duration){
                     this.playNext();
                 }
             }
         })
  }

  sToTime(t){
      return this.padZero(parseInt(String((t / (60)) % 60 ))) + ":" +
      this.padZero(parseInt(String((t) % 60)));
  }

  padZero(v){
      return (v < 10) ? "0" + v : v;
  }

  playNext(){
      var index = this.radioList.findIndex(x => x.name == this.currTitle);
      if((index + 1) == this.radioList.length){
        this.playRadio(this.radioList[0].name, this.radioList[0].artist, this.radioList[0].cover, this.radioList[0].url);
      }
      else {
          var nextIndex = index + 1;
          this.playRadio(this.radioList[nextIndex].name, this.radioList[nextIndex].artist, this.radioList[nextIndex].cover, this.radioList[nextIndex].url);
      
      }
  }

  playPrev(){
    var index = this.radioList.findIndex(x => x.name == this.currTitle);
    if((index == 0)){
        var lastIndex = this.radioList.length - 1;
      this.playRadio(this.radioList[lastIndex].name, this.radioList[lastIndex].artist, this.radioList[lastIndex].cover, this.radioList[lastIndex].url);
    }
    else {
        var prevIndex = index - 1;
        this.playRadio(this.radioList[prevIndex].name, this.radioList[prevIndex].artist, this.radioList[prevIndex].cover, this.radioList[prevIndex].url);
    
    }
}  

  minimize(){
      document.getElementById("fullPlayer").style.bottom = "-100px";
      document.getElementById("miniPlayer").style.bottom = "0px";
  }

  maximize(){
    document.getElementById("fullPlayer").style.bottom = "0px";
    document.getElementById("miniPlayer").style.bottom = "-100px";
  }

  pause(){
      this.currSong.pause();
      this.isPlaying = false;
  }

  play(){
      this.currSong.play();
      this.isPlaying = true;
  }

  cancel(){
    document.getElementById("miniPlayer").style.bottom = "-100px"; 
    this.currTitle = "";
    this.currSubtitle = "";
    this.currImage = "";
    this.currSong.pause();
    this.isPlaying = false;
    this.progress = 0;
  }

  touchStart(){
      this.isTouched = true;
      this.currRangeTime = Number(this.range.value);
  }

   touchMove(){
       this.currSecsText = this.sToTime(this.range.value);
   }

   touchEnd(){
    this.isTouched = false;
    this.currSong.currentTime = Number(this.range.value);
    this.currSecsText = this.sToTime(this.currSong.currentTime);
    this.currRangeTime = Number(this.currSong.currentTime.toFixed(2).toString().substring(0, 5));
    if(this.isPlaying){
        this.currSong.play()
    } 
   }*/

}
