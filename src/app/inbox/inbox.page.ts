import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  profileList: Observable<any[]>;
  lMsgList : Observable<any[]>;
  peerID : string;
  myuid : string;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, public router: Router) {
    this.myuid = firebase.auth().currentUser.uid

    // this.profileList = this.db.list('profiles').snapshotChanges().pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));
    this.lMsgList = this.db.list(`last-messages/${this.myuid}`)
    .valueChanges().pipe(map(changes => {
      changes.map(mkey =>{
        console.log(mkey);
        //@ts-ignore
        this.db.object(`/messages/${mkey.lastmsg}`).valueChanges().subscribe(
          (x)=>{
            //@ts-ignore
            mkey.lastmsg = x;
            //@ts-ignore
            console.log(mkey.lastmsg);
          }
        )
      });
      console.log(changes);
      return changes;
    }));
  }

 ngOnInit() {
    
  }

  
  goMessage(lMsg){
    if(lMsg.fromID != this.myuid){
      console.log(lMsg.fromID);
      this.router.navigate(['/message-chat', {
        displayName: lMsg.fromName,
        userId: lMsg.fromID,
      }])
    }else{
      console.log(lMsg.fromID);
      this.router.navigate(['/message-chat', {
        displayName: lMsg.toName,
        userId: lMsg.toID,
      }])
    }
  }
}