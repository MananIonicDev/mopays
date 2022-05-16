import { Component, OnInit } from '@angular/core';
import { ScratchCard, SCRATCH_TYPE } from 'scratchcard-js';
import * as firebase from 'firebase/app';
import { AuthsProvider } from '../services/auth';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.page.html',
  styleUrls: ['./my-dashboard.page.scss'],
})
export class MyDashboardPage implements OnInit {

  points;
  beginer = false;
  bachelor = false;;
  dragon = false;;
  lion = false;;
  master = false;
  beginnerImage = "assets/bg.jpg";
  king = false;
  displayName;
  email;
  cardId1;
  cardId2;
  cardId3;
  cardId4;
  cardId5;
  cardId6;

  constructor(public authService: AuthsProvider) { }

  ngOnInit() {
    
  firebase.auth().onAuthStateChanged( user => {
    if (user){
      setTimeout(()=>{ 
        this.loaduserdetails(user.uid); 
      }, 3000);
    } 
  })

  
}

  loaduserdetails(id) {
    this.authService.getuserdetails(id).then((res: any) => {
    this.points = res.points;
    this.displayName = res.displayName;
    this.email = res.uid;
    this.cardId1 = 'BN' + this.email;
    this.cardId2 = 'BC' + this.email;
    this.cardId3 = 'DR' + this.email;
    this.cardId4 = 'LN' + this.email;
    this.cardId5 = 'MS' + this.email;
    this.cardId6 = 'KG' + this.email;
    console.log(this.points)
    if(this.points >= 100 || this.points >= 2000){
       this.beginer = true;
    } else if (this.points >= 2001 || this.points >= 5000){
      this.bachelor = true;
    } else if (this.points >= 5001 || this.points >= 8000){
      this.dragon = true;
    } else if (this.points >= 8001 || this.points >= 9000){
      this.lion = true;
    } else if (this.points >= 9001 || this.points >= 10000){
      this.master = true;
    } else if (this.points >= 10001 || this.points >= 15000) {
      this.king = true;
    }
    if (this.points >= 100 || this.points >= 2000){
      const scContainer = document.getElementById('js--sc--container')
      const sc = new ScratchCard('#js--sc--container', {
        scratchType: SCRATCH_TYPE.CIRCLE,
        containerWidth: 300,//scContainer.offsetWidth,
        containerHeight: 300,
        imageForwardSrc: './assets/scratch.jpg',
        //imageBackgroundSrc: './assets/images/scratchcard-background.svg',
        htmlBackground: `<div class="cardamountcss"><div class="won-amnt">WON $3</div><div class="won-text">${this.cardId1}<br>Card can be use once <br>Expire after 105 points!</div></div>`,
        clearZoneRadius: 40,
        nPoints: 30,
        pointSize: 4,
        callback: () => {
          console.log('Now the window will reload !')
        }
      })
      // Init
      sc.init();
      }

      if (this.points >= 2001 || this.points >= 5000){
        const scContainer = document.getElementById('ja--sc--container')
        const sc = new ScratchCard('#ja--sc--container', {
          scratchType: SCRATCH_TYPE.CIRCLE,
          containerWidth: 300,//scContainer.offsetWidth,
          containerHeight: 300,
          imageForwardSrc: './assets/scratch.jpg',
          //imageBackgroundSrc: './assets/images/scratchcard-background.svg',
          htmlBackground: `<div class="cardamountcss"><div class="won-amnt">WON $10</div><div class="won-text">${this.cardId2}<br>Card can be use once <br>Expire after 5002 points!</div></div>`,
          clearZoneRadius: 40,
          nPoints: 30,
          pointSize: 4,
          callback: () => {
            console.log('Now the window will reload !')
          }
        })
        // Init
        sc.init();
        }

        if (this.points >= 5001 || this.points >= 8000){
          const scContainer = document.getElementById('jb--sc--container')
          const sc = new ScratchCard('#jb--sc--container', {
            scratchType: SCRATCH_TYPE.CIRCLE,
            containerWidth: 300,//scContainer.offsetWidth,
            containerHeight: 300,
            imageForwardSrc: './assets/scratch.jpg',
            //imageBackgroundSrc: './assets/images/scratchcard-background.svg',
            htmlBackground: `<div class="cardamountcss"><div class="won-amnt">WON $15</div><div class="won-text">${this.cardId3}<br>Card can be use once <br>Expire after 8002 points!</div></div>`,
            clearZoneRadius: 40,
            nPoints: 30,
            pointSize: 4,
            callback: () => {
              console.log('Now the window will reload !')
            }
          })
          // Init
          sc.init();
          }

          if (this.points >= 8001 || this.points >= 9000){
            const scContainer = document.getElementById('jc--sc--container')
            const sc = new ScratchCard('#jc--sc--container', {
              scratchType: SCRATCH_TYPE.CIRCLE,
              containerWidth: 300,//scContainer.offsetWidth,
              containerHeight: 300,
              imageForwardSrc: './assets/scratch.jpg',
              //imageBackgroundSrc: './assets/images/scratchcard-background.svg',
              htmlBackground: `<div class="cardamountcss"><div class="won-amnt">WON $20</div><div class="won-text">${this.cardId4}<br>Card can be use once <br>Expire after 9002 points!</div></div>`,
              clearZoneRadius: 40,
              nPoints: 30,
              pointSize: 4,
              callback: () => {
                console.log('Now the window will reload !')
              }
            })
            // Init
            sc.init();
            }

            if (this.points >= 9001 || this.points >= 10000){
              const scContainer = document.getElementById('jd--sc--container')
              const sc = new ScratchCard('#jd--sc--container', {
                scratchType: SCRATCH_TYPE.CIRCLE,
                containerWidth: 300,//scContainer.offsetWidth,
                containerHeight: 300,
                imageForwardSrc: './assets/scratch.jpg',
                //imageBackgroundSrc: './assets/images/scratchcard-background.svg',
                htmlBackground: `<div class="cardamountcss"><div class="won-amnt">WON $25</div><div class="won-text">${this.cardId5}<br>Card can be use once <br>Expire after 10002 points!</div></div>`,
                clearZoneRadius: 40,
                nPoints: 30,
                pointSize: 4,
                callback: () => {
                  console.log('Now the window will reload !')
                }
              })
              // Init
              sc.init();
              }

              if (this.points >= 10001 || this.points >= 15000){
                const scContainer = document.getElementById('je--sc--container')
                const sc = new ScratchCard('#je--sc--container', {
                  scratchType: SCRATCH_TYPE.CIRCLE,
                  containerWidth: 300,//scContainer.offsetWidth,
                  containerHeight: 300,
                  imageForwardSrc: './assets/scratch.jpg',
                  //imageBackgroundSrc: './assets/images/scratchcard-background.svg',
                  htmlBackground: `<div class="cardamountcss"><div class="won-amnt">WON $30</div><div class="won-text">${this.cardId6}<br>Card can be use once <br>Expire after 15000 points!</div></div>`,
                  clearZoneRadius: 40,
                  nPoints: 30,
                  pointSize: 4,
                  callback: () => {
                    console.log('Now the window will reload !')
                  }
                })
                // Init
                sc.init();
                }
  })
   
}


  createNewScratchCard() {
  }
}
