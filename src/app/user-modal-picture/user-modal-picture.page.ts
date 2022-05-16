import { Component, OnInit, ViewChild} from '@angular/core';
import { ModalController, IonSlides, NavParams, AlertController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthsProvider } from '../services/auth';
import { UtilityService } from '../services/utility';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-user-modal-picture',
  templateUrl: './user-modal-picture.page.html',
  styleUrls: ['./user-modal-picture.page.scss'],
})
export class UserModalPicturePage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  img: any;
 
  sliderOpts = {
    zoom: true
  };

  id: any;
  images = [];
  name;
  date;
  photo;
  userId;
  refPostPhoto;
  feedPhoto = [];
  pic = 'assets/radio/best.png';
  description;
  myuid;
  displayName;
  myName;
  myPhoto;
  photoURL;
  fcm_token;
  liker: boolean = false;

  constructor(private modalController: ModalController, public alertCtrl: AlertController, public toastCtrl: ToastController,
    public authService: AuthsProvider, public util: UtilityService, public router: Router,
    public navParam: NavParams, public socialSharing: SocialSharing, public db: AngularFireDatabase) { 
    this.img = this.navParam.get('img')
    this.id = this.navParam.get('id')
    this.name = this.navParam.get('name')
    this.date = this.navParam.get('date')
    this.photo = this.navParam.get('photo')
    this.userId = this.navParam.get('userId')
    this.description = this.navParam.get('description')
    this.getPhotoGallery(this.userId)
  }
  SelectLike(){
    this.liker = true;
  }
  getPhotoGallery(userId){
    let myId = firebase.auth().currentUser.uid;
    this.refPostPhoto = firebase.database().ref('/photo_list').orderByChild('userId').equalTo(userId)
    this.refPostPhoto.on('value', feedList =>{
    let feeds = []; 
    feedList.forEach( feed => {
      let item = feed.val();
      item.key = feed.key;
      item.likes = feed.val().likes || [];
      //item.Date = child.val().Date;
      item.haveILiked = feed.val().haveILiked;
      item.userId = feed.val().userId;
      for (let i = 0; i < item.likes.length; i++) {
        if (item.likes[i] === myId) {
           item.haveILiked = true;
        }
        firebase.database().ref('users/' + item.userId).once('value', (snapshot) => {
          item.Name = snapshot.val().displayName;
          item.Photo = snapshot.val().photoURL;
      });
    }
    feeds.push(item);  
      this.feedPhoto = feeds;  
      //this.dummyBook = [];
    }); 
   });
 // });     
}

 
  ngOnInit() {
    this.myuid = firebase.auth().currentUser.uid;
    this.userId = this.navParam.get('userId')
    //this.profile = this.navParams.get('profile');
      this.authService.getuserdetails(this.myuid).then((res: any) => {
        this.myName = res.displayName;
        this.myPhoto  = res.photoURL;
       
      }) 
      this.authService.getuserdetails(this.userId).then((res: any) => {
        this.photoURL = res.photoURL;
        this.displayName = res.displayName; 
        this.fcm_token = res.fcm_token;
      }) 
   }
 
  ionViewDidEnter(){
    this.slides.update();
  }
 
  async zoom(zoomIn: boolean) {
    const slider = await this.slides.getSwiper();
    const zoom = slider.zoom;
    zoomIn ? zoom.in() : zoom.out();
  }
 
  close() {
    this.modalController.dismiss();
  }

  
  shareSheetShares(){
    this.socialSharing.share(null, "MopaysApp", this.img, null).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

  shareSheetShare(img) {
    this.socialSharing.share(null, "MopaysApp", img, null).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

  async showPrompt() {
    let prompt = await this.alertCtrl.create({
        header: 'Comment on the picture',
        inputs: [
            {
                name: 'text',
                placeholder: 'Comment'
            },
        ],
        buttons: [
            {
                text: 'Cancel',
                handler: data => {
                    console.log('Cancel clicked');
                }
            },
            {
                text: 'Submit',
                handler: data => {
                    console.log('Saved clicked');
                    console.log(data.text);
                    let newPostText = data.text;
                    this.sendMessage(newPostText);


                }
            }
        ]
    });
    prompt.present();

}

async showToast(message) {
  let toast = await this.toastCtrl.create({
    message: message,
    duration: 3000,
  });
  toast.present();
}


async sendMessage(msg){
  let message = {type: 'text', fromID: this.myuid, toID: this.userId, msg: msg, fromPhoto: this.myPhoto, toPhoto: this.photoURL, fromName: this.myName, toName: this.displayName, timeStamp: Date.now()};
  let key = await this.db.list(`messages`).push(message).key;
  this.showToast('Message Sent')
  //await this.db.object(`messages/${key}`).set({chatKey: key, type: 'text', fromID: this.myuid, toID: this.userId, msg: this.msg, fromPhoto: this.myPhoto, toPhoto: this.photoURL, fromName: this.myName, toName: this.displayName, timeStamp: Date.now()});

  await this.db.list(`message-by-user/${this.myuid}/${this.userId}`).push({msgkey: key, unread: 1});
  await this.db.list(`message-by-user/${this.userId}/${this.myuid}`).push({msgkey: key, unread: 0});

  await this.db.object(`last-messages/${this.myuid}/${this.userId}`).set({lastmsg: key});
  await this.db.object(`last-messages/${this.userId}/${this.myuid}`).set({lastmsg: key});
  this.util.sendNotification( `${msg}`, `${this.myName}`, this.fcm_token).subscribe((data) => {
    console.log('send notifications', data);
    console.log('tokens', this.fcm_token);
   }, error => {
  console.log(error);
 });
 //this.msg = "";
//this.content.scrollToBottom();
}
 

likePost(post, postId) {
  
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
  }  else {

  let myId = firebase.auth().currentUser.uid;
  let score;
  let likes = [];

  console.log("post: " + postId);
  for (let i = 0; i < this.feedPhoto.length; i++)
      if (this.feedPhoto[i].key === postId) {
          console.log("POST FOUND and liked");
          this.feedPhoto[i].haveILiked = true;
          this.feedPhoto[i].Score++;
          //this.haveILiked = true;
          break;
      }

      firebase.database().ref('/photo_list/' + postId).once('value').then(function (snapshot) {
      likes = (snapshot.val() && snapshot.val().likes) || [];
      score = (snapshot.val() && snapshot.val().Score);
      likes.push(myId);
      score = score + 1;

      firebase.database().ref('/photo_list/'  + postId).child('likes').set(likes);
      firebase.database().ref('/photo_list/'  + postId).child('Score').set(score);
     
      });
    }
 });
}

unlikePost(post, postId) {

    
firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
      console.log("not login");
      this.router.navigate(['/login'])
    }  else {
  let myId = firebase.auth().currentUser.uid;
  let score;
  let likes = [];
  let updatedLikes = [];

  console.log("post: " + postId);
  for (let i = 0; i < this.feedPhoto.length; i++)
      if (this.feedPhoto[i].key === postId) {
          console.log("POST FOUND and unliked");
          this.feedPhoto[i].haveILiked = false;
          this.feedPhoto[i].Score--;
          //this.haveILiked = false;
          break;
      }

      firebase.database().ref('/photo_list/'  + postId).once('value').then(function (snapshot) {
      likes = (snapshot.val() && snapshot.val().likes) || [];
      score = (snapshot.val() && snapshot.val().Score);
      likes.push(myId);


      for (let i = 0; i < likes.length; i++)
      {
          if (likes[i] != myId)
          {
              updatedLikes.push(likes[i]);
          }
      }

      score = score - 1;

      firebase.database().ref('/photo_list/'  + postId).child('likes').set(updatedLikes);
      firebase.database().ref('/photo_list/'  + postId).child('Score').set(score);
   });
}
});
}

 
}