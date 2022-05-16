import { Component, ViewChild, OnInit } from '@angular/core';
//import { IonSlides, IonSegment } from '@ionic/angular';
import { AlertController, IonContent, LoadingController, NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { AuthsProvider } from '../services/auth';
import { Router } from '@angular/router';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Contact } from '../model/users';
import { ContactList } from '../model/userstwo';

@Component({
  selector: 'app-chat-group',
  templateUrl: './chat-group.page.html',
  styleUrls: ['./chat-group.page.scss'],
})
export class ChatGroupPage implements OnInit {

  //@ViewChild("slider", { read: undefined, static: false }) slider: IonSlides;
  // @ViewChild("segment", { read: undefined, static: false }) segment: IonSegment;
  @ViewChild(IonContent, { static: true }) content: IonContent;


  showfooter = false;
  displayName;
  photoURL;
  currentUserId;
  message: string = '';
  anonymousPic = "assets/imgs/profile.jpg";
  public messagesRef: firebase.database.Reference;
  public messagesList = [];
  private limit: number = 10;
  public messagesLength: number;
  Id;
  showEmojiPicker = false;
  moderate;
  loading;

  public contactsRef = firebase.database().ref('users/').orderByChild("type").equalTo('users').limitToLast(20)
  public contacts: Contact[] = [];
  public contactsList: ContactList[] = [];

  constructor(
    public authService: AuthsProvider,
    public router: Router,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public emailComposer: EmailComposer
  ) {
  }

  async checkChat() {
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await this.loading.present();
    firebase.database().ref(`chats/chat`).once('value', snapshot => {
      if (snapshot.hasChild('moderate')) {
        this.moderate = snapshot.val().moderate
        this.loading.dismiss();
        if (this.moderate) {
          this.getChat();
        }
        else {
          this.alertCtrl.create({
            header: 'Oops !',
            message: 'Chat is turned off by Admin',
            backdropDismiss: false,
            buttons: [{
              text: 'OK',
              handler: () => {
                this.router.navigate(['tabs/tab1']);
              }
            }]
          })
            .then(alert => {
              alert.present();
            });
        }
      }
    });
  }

  reportChat(username) {
    let email = {
      to: 'hello@mopays.com',
      //cc: 'max@mustermann.de',
      subject: 'Report Chat',
      body: 'Hello Mopays, I notice the following user ' + username + ' is violating the app Terms of Service.<br/><br/>Thank you',
      isHtml: true
    };
    this.emailComposer.open(email);
  }

  goOnlineUsers() {
    this.router.navigate(['/online-users'])
  }

  async getChat() {
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await this.loading.present();
    this.messagesRef = firebase.database().ref('chats');
    this.messagesRef.on('value', msgs => {
      this.messagesLength = msgs.numChildren();
    });

    this.messagesRef.orderByChild('timestamp').limitToLast(this.limit).on('value', messages => {
      let messagesList = [];
      messages.forEach(data => {
        messagesList.push({
          message: data.val().message,
          timestamp: data.val().timestamp,
          type: data.val().type,
          name: data.val().name,
          photo: data.val().photo,
          userId: data.val().userId,
          key: data.key,
        })
      });
      this.messagesList = messagesList;
      this.loading.dismiss();
      setTimeout(() => { this.content.scrollToBottom(); }, 200);
      console.log(this.messagesList);
    });
  }

  ngOnInit() {
    this.contactsRef.once('value', contacts => {
      let contactsList = [];
      contacts.forEach(data => {
        contactsList.push({
          email: data.val().email,
          displayName: data.val().displayName,
          photoURL: data.val().photoURL,
          about: data.val().about,
          uid: data.key,
          followersCount: data.val().followersCount,
        })
      });
      this.contacts = contactsList;
      console.log(this.contacts);
      this.contactsList = this.contacts;
    });
  }

  async anonymousProfile() {
    this.alertCtrl.create({
      header: 'Anonymous User',
      message: 'This user is not registered.',
      backdropDismiss: false,
      buttons: [{
        text: 'Dismiss',
        role: 'cancel',
        handler: () => {
          console.log('Alert Dismissed!');
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }

  goProfile(uid: string) {
    this.router.navigate(['/users-details', {
      id: uid
    }])
  }


  onFocus() {
    this.showEmojiPicker = false;
    this.content.scrollToBottom();
  }



  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
    } else {
      this.content.scrollToBottom();
    }
  }

  handleEmoji(e) {
    this.message += e.char;
    console.log('Emoji Name', e.name);
  }

  handleCharDelete(e) {
    if (this.message.length > 0) {
      this.message = this.message.substr(0, this.message.length - 2);
    }
  }
  /*async segmentChanged(event: any) {
    // get the id of the current slide as number
    const slideId = +(event.detail.value as string).replace("ion-sb-", "");
    // slide to the selected segment
    await this.slider.slideTo(slideId, 100);

  }

  async slideChanged() {
    // set the segment to the active slide
    this.segment.value =
      "ion-sb-" + (await this.slider.getActiveIndex()).toString();
  }*/

  loaduserdetails(id) {
    this.authService.getuserdetails(id).then((res: any) => {
      this.displayName = res.displayName;
      this.photoURL = res.photoURL;
    })
  }

  stringGen(len) {
    var text = " ";
    var charset = "0123456789";
    for (var i = 0; i < len; i++)
      text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
  }

  ionViewDidEnter() {
    this.checkChat();
    this.Id = "user" + this.stringGen(5)
    setInterval(() => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.currentUserId = user.uid
          this.loaduserdetails(user.uid);
        }
      })
    }, 3000);
  }

  sendAnonymous() {
    firebase.database().ref('chats').push({
      message: this.message,
      timestamp: +new Date(),
      type: "anonymous",
      name: this.Id,
      photo: this.anonymousPic,
    })
    this.message = '',
      this.content.scrollToBottom()
  }

  send() {
    firebase.database().ref('chats').push({
      message: this.message,
      timestamp: +new Date(),
      type: "uid",
      name: this.displayName,
      userId: firebase.auth().currentUser.uid,
      photo: this.photoURL,
    })
    this.message = '',
      this.content.scrollToBottom()
  }


}