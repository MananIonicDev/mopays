import { Component, OnInit } from '@angular/core';
import { AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import * as firebase from 'firebase/app';
import { ToastController, AlertController, NavController, ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.page.html',
  styleUrls: ['./group-details.page.scss'],
})
export class GroupDetailsPage implements OnInit {

  pic = "assets/pub2.jpg";
  item: AngularFireObject<any>;
  public items: any = {};
  id;
  joinedGroup;
  currentuserId;
  members = [];
  public isFollowing = false;
  public follows = [];
  feeditems = [];
  refPost: any;
  shareUrl = "https://mopays.app";
  myphotoURL;

  constructor(public db: AngularFireDatabase, public router: Router, public nav: NavController,
    public route: ActivatedRoute, public toastCtrl: ToastController, public socialSharing: SocialSharing,
    public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) { 
      firebase.auth().onAuthStateChanged( user => {
        if (user){
          this.currentuserId = user.uid
          this.amIFollowing(user.uid)
        }
      })
      this.getFeed()
      this.id = this.route.snapshot.paramMap.get('groupId');
    }
 
    editGroup(){
      this.router.navigate(['/group-edit', {
        groupId: this.id
      }])
    }

    async showToast(message) {
      let toast = await this.toastCtrl.create({
        message: message,
        duration: 3000,
      });
      toast.present();
    }

    goGroupPost(){
      this.id = this.route.snapshot.paramMap.get('groupId');
      this.router.navigate(['/group-post', {
        groupId: this.id
      }])
    }

    createPost(){
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            console.log("not login");
            this.router.navigate(['/login'])
          }  else { 
             this.goGroupPost()
          }
        })    
    }

    goGroupInfo(){
      this.id = this.route.snapshot.paramMap.get('groupId');
      this.router.navigate(['/group-info', {
        groupId: this.id
      }])
    }

    goMembers(){
      this.id = this.route.snapshot.paramMap.get('groupId');
      this.router.navigate(['/group-members', {
        groupId: this.id
      }])
    }


    amIFollowing(userId)
    {
        //let idToFollow = this.id
        //let userId = this.currentuserId;
        this.id = this.route.snapshot.paramMap.get('groupId');
        //let followButton = document.getElementById("followButton");
        //let unfollowButton = document.getElementById("unfollowButton");
  
        let amIFollowing = this.isFollowing;
        let following;
       
  
        this.follows = [];
        let followsClone = this.follows;
        //followsClone = [];
  
        
  
        firebase.database().ref('/groups/' + this.id).once('value').then((snapshot) => {

            following = (snapshot.val() && snapshot.val().members);
  
            for (let i = 0; i < following.length; i++)
            {
                if (following[i] == userId)
                {
                    console.log("You are following this user already");
                    amIFollowing = true;
                  
                }
                
            }
  
            if (amIFollowing === true)
            {
                console.log("You are following this user already");
                followsClone.push({ "following": true });
            }
            else
            {
                console.log("You are NOT following this user already");
                //followButton.innerHTML = "Follow";
                followsClone.push({ "following": false });
            }
  
        });
    }


  
    ngOnInit() {
      //this.amIFollowing();
      this.id = this.route.snapshot.paramMap.get('groupId');
      this.item = this.db.object("/groups/" + this.id);
      this.item.valueChanges().subscribe((data: any) => {
        if (data != null) {
          this.items = data;
          //this.members = data.members;
          this.items["$key"] = this.id;

        }
      })

    
    
     
      /*firebase.database().ref('/groups/' + this.id).once('value').then(function (snapshot) {
        let favouritesKey = snapshot.val().members || [];
        //this.joinedGroup = snapshot.val().haveIJoined;

        console.log(favouritesKey)
        let myId = firebase.auth().currentUser.uid;
        for (var i = 0; i <= favouritesKey.length - 1; i++) {
          if (favouritesKey[i] == myId) {
            this.joinedGroup = true
            console.log('He is part')
          } 
        }

       

        })*/ 
  }


  groupJoinAlert(){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
          console.log("not login");
          this.router.navigate(['/login'])
        }  else { 
           this.joinGroup()
        }
      })    
  }

  async presentConfirmLeave(){
    let alert = await this.alertCtrl.create({
      header: 'Leave Group',
      message: 'Are you sure to leave Group?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Leave',
          handler: () => {
            this.leaveGroup()
            this.nav.pop()
          }
        }
      ]
    });
    alert.present();
  }
 


  joinGroup(){
    let myId = firebase.auth().currentUser.uid;
    let groupId = this.id;
    let members = [];
    let groups = [];
    let memberLength;
   
       firebase.database().ref('/groups/' + groupId).once('value').then((snapshot) => {
        members = (snapshot.val() && snapshot.val().members) || [];
        memberLength = (snapshot.val() && snapshot.val().memberLength);
        members.push(myId);
        memberLength = memberLength + 1;

        firebase.database().ref('/groups/'  + groupId).child('members').set(members);
        firebase.database().ref('/groups/' + groupId).child('memberLength').set(memberLength);
        });

        //this.amIFollowing = true;
        firebase.database().ref('/users/' + myId).once('value').then(function (snapshot) {
          groups = (snapshot.val() && snapshot.val().groups) || [];
          groups.push(groupId);
          firebase.database().ref('/users/'  + myId).child('groups').set(groups);
          });
          this.showToast('You joined group')
          firebase.auth().onAuthStateChanged( user => {
            if (user){
              this.currentuserId = user.uid
              this.amIFollowing(user.uid)
            }
          })

      }
  
      leaveGroup(){
          let myId = firebase.auth().currentUser.uid;
          let members = [];
          let groups = [];
          let updatedMembers = [];
          let updateUserMember = [];
          let memberLength;
          let groupId = this.id;
    
              firebase.database().ref('/groups/'  + groupId).once('value').then((snapshot) => {
              members = (snapshot.val() && snapshot.val().members) || [];
              memberLength = (snapshot.val() && snapshot.val().memberLength);
              members.push(myId);
              for (let i = 0; i < members.length; i++)
              {
                  if (members[i] != myId)
                  {
                      updatedMembers.push(members[i]);
                  }
              }
  
              memberLength = memberLength - 1;
  
              firebase.database().ref('/groups/'  + groupId).child('members').set(updatedMembers);
              firebase.database().ref('/groups/' + groupId).child('memberLength').set(memberLength);
           });
  
           firebase.database().ref('/users/'  + myId).once('value').then((snapshot) => {
            groups = (snapshot.val() && snapshot.val().groups) || [];
            groups.push(groupId);
            for (let i = 0; i < groups.length; i++)
            {
                if (groups[i] != groupId)
                {
                  updateUserMember.push(groups[i]);
                }
            }
            firebase.database().ref('/users/'  + myId).child('groups').set(updateUserMember);
         });
         this.showToast('You leave group')
  
      }




      getFeed(){
        this.id = this.route.snapshot.paramMap.get('groupId');
        this.refPost = firebase.database().ref('group_post').orderByChild('groupId').equalTo(this.id)
        this.refPost.on('value', feedList =>{
        let feeds = []; 
  
        feedList.forEach( feed => {
          let likes = feed.val().likes || [];
          let haveILiked = feed.val().haveILiked;
   
           for (let i = 0; i < likes.length; i++) {
               if (likes[i] === this.currentuserId) {
                  haveILiked = true;
               }
           }
  
        feeds.push({
          postId: feed.key,
          userId: feed.val().UserId,
          score: feed.val().Score,
          description: feed.val().description,
          images: feed.val().images || [],
          video: feed.val().video,
          youvideo: feed.val().youvideo,
          timeStamp: feed.val().Date,
          userPhoto: feed.val().Photo,
          userName: feed.val().Name,
          comments: feed.val().comments,
          likes: likes,
          commentLength: feed.val().commentLength,
          haveILiked: haveILiked,
        });  
          this.feeditems = feeds;  
        }); 
      });     
    }
  
  
    reportFeeds(id, item){
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            console.log("not login");
            this.router.navigate(['/login'])
        }  else {
           // report function here
        }
      })
    }
  
    saveFeeds(id, item){
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            console.log("not login");
            this.router.navigate(['/login'])
        }  else {
           // save function here
        }
      })
    }
  
   
  
    shareSheetShare(description) {
      this.socialSharing.share(description,"MopaysApp", description, this.shareUrl).then(() => {
        console.log("shareSheetShare: Success");
      }).catch(() => {
        console.error("shareSheetShare: failed");
      });
    }
  
    shareSheetShareImage(img){
      this.socialSharing.share(null,"MopaysApp", img, this.shareUrl).then(() => {
        console.log("shareSheetShare: Success");
      }).catch(() => {
        console.error("shareSheetShare: failed");
      });
    }
  
    shareSheetShareImageText(img, text){
      this.socialSharing.share(text,"MopaysApp", img, this.shareUrl).then(() => {
        console.log("shareSheetShare: Success");
      }).catch(() => {
        console.error("shareSheetShare: failed");
      });
    }
  
   
    async presentActionSheetNonUser(id, item, description) {
      const actionSheet = await this.actionSheetCtrl.create({
        //header: 'Albums',
        buttons: [{
          text: 'Report Feed',
          role: 'destructive',
          handler: () => {
            alert('Post Report successfully')
          }
        }, {
          text: 'Share',
          handler: () => {
            this.shareSheetShare(description)
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
  
    goComment(postId, userId, commentLength){
      this.router.navigate(['/group-comment', {
        postId: postId,
        userId: userId,
        commentLength: commentLength,
      }])
    }
  
    goCommy(postId, userId, commentLength){
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            console.log("not login");
            this.router.navigate(['/login'])
        }  else {
           this.goComment(postId, userId, commentLength)
        }
      })
  
    }
  
    viewUserProfile(userId){
      if(this.currentuserId == userId){
        this.router.navigate(['/my-profile'])
      } else {
        this.router.navigate(['/user-profile', {
          uid: userId
        }])
      }
    }
  
    viewProfiles(userId){
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            console.log("not login");
            this.router.navigate(['/login'])
        }  else {
           this.viewUserProfile(userId)
        }
      })
  
    }
    
  
  
    async presentActionSheetUser(id, item, description) {
      const actionSheet = await this.actionSheetCtrl.create({
        //header: 'Albums',
        buttons: [{
          text: 'Edit Feed',
          role: 'destructive',
          handler: () => {
            this.editFeeds(id, item)
          }
        },  {
          text: 'Delete Feed',
          handler: () => {
            this.deleteFeeds(id, item)
          }
        }, 
        {
          text: 'Share',
          handler: () => {
            this.shareSheetShare(description)
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
  
    editFeeds(id, item){
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          console.log("not login");
          this.router.navigate(['login'])
      }  else {
           this.router.navigate(['/group-feed-edit', {
             id:id,
             item:item
           }])
       }
     })
    }
  
    deleteFeeds(id, item){
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          console.log("not login");
          this.router.navigate(['login'])
      }  else {
           firebase.database().ref('group_post').child(id).remove().then(function (){})
           let index = this.feeditems.indexOf(item);
        if (index > -1) {
          this.feeditems.splice(index, 1);
        }
       }
     })
    }
  
  
    getCurrentUser(myId){
      return firebase.database().ref('users/' + myId).once('value', (snapshot) => {
        //console.log(snapshot.val().name);
        this.myphotoURL = snapshot.val().photoURL;
      })
    }
   
    Refresh(refresher) {
      console.log('Begin async operation');
      this.feeditems = [];
      this.getFeed()
      setTimeout(() => {
          console.log('Async operation has ended');
          refresher.target.complete();
      }, 2000);
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
  
          console.log("post: " + post.postId);
          for (let i = 0; i < this.feeditems.length; i++)
              if (this.feeditems[i].postId === postId) {
                  console.log("POST FOUND and liked");
                  this.feeditems[i].haveILiked = true;
                  this.feeditems[i].score++;
                  //this.haveILiked = true;
                  break;
              }
  
          let Query = firebase.database().ref('/group_post/' + postId).once('value').then(function (snapshot) {
              likes = (snapshot.val() && snapshot.val().likes) || [];
              score = (snapshot.val() && snapshot.val().Score);
              likes.push(myId);
              score = score + 1;
    
              firebase.database().ref('/group_post/'  + postId).child('likes').set(likes);
              firebase.database().ref('/group_post/'  + postId).child('Score').set(score);
              
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
    
          console.log("post: " + post.postId);
          for (let i = 0; i < this.feeditems.length; i++)
              if (this.feeditems[i].postId === postId) {
                  console.log("POST FOUND and unliked");
                  this.feeditems[i].haveILiked = false;
                  this.feeditems[i].score--;
                  //this.haveILiked = false;
                  break;
              }
    
          let Query = firebase.database().ref('/group_post/'  + postId).once('value').then(function (snapshot) {
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
    
              firebase.database().ref('/group_post/'  + postId).child('likes').set(updatedLikes);
              firebase.database().ref('/group_post/'  + postId).child('Score').set(score);
           });
        }
      });
    }

    goProfile(uid){
      if(uid === this.currentuserId){
        const navData: NavigationExtras = {
          queryParams: {
            from: 'group',
          }
        };
        this.router.navigate(['my-profile'], navData);
      } else {
        this.router.navigate(['/users-details', {
          id: uid
        }])
      }
    }
  

}
