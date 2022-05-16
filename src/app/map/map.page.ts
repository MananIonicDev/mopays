import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapDetailsPage } from '../map-details/map-details.page';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  placeList  = [{
    name: 'Amusement',
    nickname: 'amusement_park',
    img: 'https://i.ibb.co/KhVLmFx/circus-828680-640.jpg',
  },{
    name: 'Airport',
    nickname: 'airport',
    img: 'https://i.ibb.co/N6cPQbX/model-planes-1566822-640.jpg',
  },{
    name: 'ATM',
    nickname: 'atm',
    img: 'https://i.ibb.co/Mkd1VTd/atm-1524870-640.jpg',
  },{
    name: 'Bank',
    nickname: 'bank',
    img: 'https://i.ibb.co/m66TXg2/packs-163497-640.jpg',
  },{
    name: 'Salon',
    nickname: 'beauty_salon',
    img: 'https://i.ibb.co/Wy5vT0Z/haircut-834280-640.jpg',
  },{
    name: 'Car Dealer',
    nickname: 'car_dealer',
    img: 'https://i.ibb.co/Lr2hB40/mercedes-587557-640.jpg',
  },{
    name: 'Casino',
    nickname: 'casino',
    img: 'https://i.ibb.co/XLSzppp/gambling-602976-640.jpg',
  },
  {
    name: 'Cemetery',
    nickname: 'cemetery',
    img: 'https://i.ibb.co/XbSzTD6/cemetery-989920-640.jpg',
  },
  {
    name: 'Church',
    nickname: 'church',
    img: 'https://i.ibb.co/m4nxRMm/church-3024768-640.jpg',
  },
  {
    name: 'Dentist',
    nickname: 'dentist',
    img: 'https://i.ibb.co/YNv4Jx2/dentist-2530990-640.jpg',
  },
  {
    name: 'Doctor',
    nickname: 'doctor',
    img: 'https://i.ibb.co/n8HLtKn/doctor-1149149-640.jpg',
  },
  {
    name: 'Electrician',
    nickname: 'electrician',
    img: 'https://i.ibb.co/MnwVhq7/electrician-729240-640.jpg',
  },
  {
    name: 'Gas Station',
    nickname: 'gas_station',
    img: 'https://i.ibb.co/1rfPRgJ/petrol-stations-3731375-640.jpg',
  },
  {
    name: 'Gym',
    nickname: 'gym',
    img: 'https://i.ibb.co/r6tDvnv/plank-2054729-640.jpg',
  },
  {
    name: 'Hindu Temple',
    nickname: 'hindu_temple',
    img: 'https://i.ibb.co/0r8vHt7/hindu-2628776-640.jpg',
  },
  {
    name: 'Hospital',
    nickname: 'hospital',
    img: 'https://i.ibb.co/RYLGm9v/surgery-1807541-640.jpg',
  },
  {
    name: 'Laundry',
    nickname: 'laundry',
    img: 'https://i.ibb.co/X8jGydG/laundry-413688-640.jpg',
  }, {
    name: 'Library',
    nickname: 'library',
    img: 'https://i.ibb.co/qFYfFVM/library-488690-640.jpg',
  }, {
    name: 'Mosque',
    nickname: 'mosque',
    img: 'https://i.ibb.co/GsXhWd0/sheihk-zayed-mosque-1017244-640.jpg',
  }, {
    name: 'Museum',
    nickname: 'museum',
    img: 'https://i.ibb.co/nw8K4sN/national-history-museum-4314035-640.jpg',
  }, {
    name: 'Pharmacy',
    nickname: 'pharmacy',
    img: 'https://i.ibb.co/PchwDKx/scientist-2141259-640.jpg',
  }, {
    name: 'Police',
    nickname: 'police',
    img: 'https://i.ibb.co/YQh8ZnR/police-275875-640.jpg',
  },
  {
    name: 'Restaurant',
    nickname: 'restaurant',
    img: 'https://i.ibb.co/cX7KR4T/platter-2009590-640.jpg',
  },
  {
    name: 'School',
    nickname: 'school',
    img: 'https://i.ibb.co/27zGjLX/children-306607-640.jpg',
  }, {
    name: 'Supermarket',
    nickname: 'supermarket',
    img: 'https://i.ibb.co/Gn5L4gT/beverages-3105631-640.jpg',
  },
  {
    name: 'Zoo',
    nickname: 'zoo',
    img: 'https://i.ibb.co/whMmhwJ/lions-1660044-640.jpg',
  }
]

term = "";

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async goNearBy(nickname, img, name){
    const modal = await this.modalCtrl.create({
    component: MapDetailsPage,
    componentProps: { nickname: nickname, image: img, name: name}
    //cssClass: 'half-modal'
  });
  modal.present();
  
  //Get returned data
  const { data } = await modal.onWillDismiss();
  console.log('this is the data', data) 
  
  }

}
