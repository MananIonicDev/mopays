import { Component, OnInit, ViewChild, Renderer2, Input } from '@angular/core';
import { ModalController, NavParams, LoadingController, IonNav, NavController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { GalleryCommentPage } from '../gallery-comment/gallery-comment.page';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

export const snapshotToArray = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
}


@Component({
  selector: 'app-gallery-slide',
  templateUrl: './gallery-slide.page.html',
  styleUrls: ['./gallery-slide.page.scss'],
})
export class GallerySlidePage implements OnInit {
  @ViewChild('wizardSlider', { static: false }) slider;
  @Input() nav: IonNav;

  sliderOptions = {
    scrollbar: true,
    autoplay: true,

  };

  prev = false;
  next = true;
  ignoreDidChange = false;

  viewEntered = false;

  stories: any[] = [];
  id;
  storiesRef;
  dummy = Array(10);

  myphotoURL;
  mydisplayName;

  constructor(
    private renderer2: Renderer2,
    //private appData: AppData,
    public loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    public navParam: NavParams,
    //public navCtrl: NavController,
    private photoViewer: PhotoViewer,
    public router: Router,
    public socialSharing: SocialSharing,
    public navCtrl: NavController,
    public emailComposer: EmailComposer,
  ) {
    this.getInfo();
  }


  closeModal() {
    this.modalCtrl.dismiss()
  }

  /*goComment(comment){
    this.router.navigate(['/gallery-comment', {
      postId: this.id,
      commentLength: comment,
    }])
  }*/

  getInfo() {
    return firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', (snapshot) => {
      this.mydisplayName = snapshot.val().displayName;
      this.myphotoURL = snapshot.val().photoURL;
    });
  }

  goComment(comment, key) {
    this.nav.push(GalleryCommentPage, {
      postId: key,
      commentLength: comment,
    })
  }

  showModal() {
    this.nav.push('gallery-post')
  }

  viewImage(image, description) {
    this.photoViewer.show(image, description, { share: true });
  }

  shareSheetShare(image, description) {
    this.socialSharing.share(description, "MopaysApp", image, null).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

  report(username) {
    let email = {
      to: 'hello@mopays.com',
      //cc: 'max@mustermann.de',
      subject: 'Report Photo',
      body: 'Hello Mopays, I notice the following user ' + username + ' is violating the app Terms of Service.<br/><br/>Thank you',
      isHtml: true
    };
    this.emailComposer.open(email);
  }

  likePost(post, postId) {

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
      } else {

        if (firebase.auth().currentUser.uid != post.userId) {
          firebase.database().ref('notices').push({
            read: false,
            senderId: firebase.auth().currentUser.uid,
            displayName: this.mydisplayName,
            ownerId: post.userId,
            postId: postId,
            typer: 'like',
            time: firebase.database.ServerValue.TIMESTAMP,
            photoURL: this.myphotoURL,
            type: 'photo-like'
          })
        }

        let myId = firebase.auth().currentUser.uid;
        let score;
        let likes = [];

        console.log("post: " + postId);
        for (let i = 0; i < this.stories.length; i++)
          if (this.stories[i].key === postId) {
            console.log("POST FOUND and liked");
            this.stories[i].haveILiked = true;
            this.stories[i].Score++;
            //this.haveILiked = true;
            break;
          }

        firebase.database().ref('/gallery_list/' + postId).once('value').then(function (snapshot) {
          likes = (snapshot.val() && snapshot.val().likes) || [];
          score = (snapshot.val() && snapshot.val().Score);
          likes.push(myId);
          score = score + 1;

          firebase.database().ref('/gallery_list/' + postId).child('likes').set(likes);
          firebase.database().ref('/gallery_list/' + postId).child('Score').set(score);
          firebase.database().ref('/gallery_list/' + postId).child('haveILiked').set(true);
        });
      }
    });
  }

  unlikePost(post, postId) {


    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
      } else {
        let myId = firebase.auth().currentUser.uid;
        let score;
        let likes = [];
        let updatedLikes = [];

        console.log("post: " + postId);
        for (let i = 0; i < this.stories.length; i++)
          if (this.stories[i].key === postId) {
            console.log("POST FOUND and unliked");
            this.stories[i].haveILiked = false;
            this.stories[i].Score--;
            //this.haveILiked = false;
            break;
          }

        firebase.database().ref('/gallery_list/' + postId).once('value').then(function (snapshot) {
          likes = (snapshot.val() && snapshot.val().likes) || [];
          score = (snapshot.val() && snapshot.val().Score);
          likes.push(myId);


          for (let i = 0; i < likes.length; i++) {
            if (likes[i] != myId) {
              updatedLikes.push(likes[i]);
            }
          }

          score = score - 1;

          firebase.database().ref('/gallery_list/' + postId).child('likes').set(updatedLikes);
          firebase.database().ref('/gallery_list/' + postId).child('Score').set(score);
          firebase.database().ref('/gallery_list/' + postId).child('haveILiked').set(false);

        });
      }
    });
  }


  ngOnInit() {
    if (this.navParam.get('catid')) {
      this.id = this.navParam.get('catid');
      this.storiesRef = firebase.database().ref('/gallery_list/').orderByChild('category').equalTo(this.id);
      this.storiesRef.on('value', resp => {
        this.stories = [];
        this.stories = snapshotToArray(resp);
        this.dummy = [];
      });
    }
    else if (this.id = this.navParam.get('keyid')) {
      this.stories = [];
      this.id = this.navParam.get('keyid');
      this.stories = Array.of(this.id);
    }

  }



}
