import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavParams, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthsProvider } from '../services/auth';

@Component({
  selector: 'app-gallery-comment',
  templateUrl: './gallery-comment.page.html',
  styleUrls: ['./gallery-comment.page.scss'],
})
export class GalleryCommentPage implements OnInit {

  postId;
  //userId;
  message;
  photoURL;
  displayName;
  feedsComment = [];
  currentUserId;
  commentLength;
  commentNumber;

  constructor(public actionSheetCtrl: ActionSheetController, public navParam: NavParams,
    public route: ActivatedRoute, public authService: AuthsProvider, public modalCtrl: ModalController) { 
    //this.postId = this.route.snapshot.paramMap.get('postId');
    //this.commentLength = this.route.snapshot.paramMap.get('commentLength');
    
    this.postId = this.navParam.get('postId');
    this.commentLength = this.navParam.get('commentLength');
    this.commentNumber = Number.parseInt(this.commentLength);
    console.log(this.postId);
    console.log(this.commentLength);
    console.log(this.commentNumber);
  }

  closeApp(){
    this.modalCtrl.dismiss()
  }

      deleteComment(id, item){
         firebase.database().ref('/gallery_list/' + this.postId + '/comments/' + id).remove().then(function (){})
         if(this.commentNumber === 0) {
         firebase.database().ref('/gallery_list/' + this.postId).update({
          commentLength: 0
         })
        } else {
          firebase.database().ref('/gallery_list/' + this.postId).update({
            commentLength:this.commentLength - 1
           })
        }
         let index = this.feedsComment.indexOf(item);
      if (index > -1) {
        this.feedsComment.splice(index, 1);
     }
  // })
  }


  async presentActionSheet(id, item) {
    const actionSheet = await this.actionSheetCtrl.create({
      //header: 'Albums',
      buttons: [{
        text: 'Report Comment',
        role: 'destructive',
        handler: () => {
          console.log('Delete clicked');
          alert('Comment Report successfully')
        }
      }, {
        text: 'Delete Comment',
        handler: () => {
          this.deleteComment(id, item)
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  send(){
    firebase.database().ref('gallery_list').child(this.postId).child('comments').push({
      message: this.message,
      date: firebase.database.ServerValue.TIMESTAMP,
      photoURL: this.photoURL,
      displayName: this.displayName,
    }).then((success)=>{
      this.message = ''
      firebase.database().ref('/gallery_list/' + this.postId).update({
      commentLength: this.commentNumber + 1
     })
    })
    
    
  }

  getComment(){
    firebase.database().ref('/gallery_list/' + this.postId).child('comments').on('value', snapshot =>{
  		this.feedsComment = [];
  		snapshot.forEach( snap =>{
  			this.feedsComment.push({
  			  id: snap.key,
	        message: snap.val().message,
	        displayName: snap.val().displayName,
	        photoURL: snap.val().photoURL,
	        date: snap.val().date
  			});
  		});
  	});
  }

  
  ngOnInit() {
    this.getComment()
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.currentUserId = user.uid
        this.loaduserdetails(user.uid);
      } 
    })
  }

  loaduserdetails(id) {
    this.authService.getuserdetails(id).then((res: any) => {
      this.displayName = res.displayName;
      this.photoURL = res.photoURL;
    }) 
}


}
