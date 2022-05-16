import { Component, OnInit, ViewChild} from '@angular/core';
import { IonNav, NavParams} from '@ionic/angular';
import { GallerySlidePage } from '../gallery-slide/gallery-slide.page';



@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.page.html',
  styleUrls: ['./gallery-list.page.scss'],
})
export class GalleryListPage implements OnInit {
  

  @ViewChild("nav", { static: true }) nav: IonNav;
  id;

 
  constructor(public navParam: NavParams
   
  ) { }

  /*goComment(comment){
    const nav = document.querySelector('ion-nav');
    nav.push(GalleryCommentPage, {
      postId: this.id,
      commentLength: comment,
    })
  }*/

  ngOnInit(): void {
    if(this.navParam.get('catid')){
      this.id = this.navParam.get('catid');
      this.nav.setRoot(GallerySlidePage, { nav: this.nav, catid: this.id });
    }
    else if (this.id = this.navParam.get('keyid')) {
      this.id = this.navParam.get('keyid');
      this.nav.setRoot(GallerySlidePage, { nav: this.nav, keyid: this.id });
    }
     // MyFirstPage is a class of an Angular component
  }
  
  

  
 

}
