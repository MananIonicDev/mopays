import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-preview-image',
  templateUrl: './preview-image.page.html',
  styleUrls: ['./preview-image.page.scss'],
})
export class PreviewImagePage implements OnInit {

  previews = [];

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.previews  = JSON.parse(sessionStorage.getItem("previews"));
  }

  bytesToSize(bytes){
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    for(var i = 0; i < sizes.length; i++){
      if(bytes <= 1024){
        return bytes + '' + sizes[i];
      } else {
        bytes = parseFloat(String(bytes / 1024)).toFixed(2)
      }
    }
  }

  getIcon(type:string){
    if(type.startsWith("image")){
      return "image-outline";

    } else if(type.startsWith("video")){
       return "videocam-outline";

    } else if(type.startsWith("audio")){
       return "musical-note-outline";

    }  else {
       return "document-outline"
    } 
  }

  getColor(type:string){
    if(type.startsWith("image")){
      return "primary";

    } else if(type.startsWith("video")){
       return "success";

    } else if(type.startsWith("audio")){
       return "music";
       
    }  else {
       return "warning"
    } 
  }

    send(){
      sessionStorage.setItem("send", "true");
      this.modalCtrl.dismiss()
    }

}
