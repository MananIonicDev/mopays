import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-features-modal',
  templateUrl: './features-modal.page.html',
  styleUrls: ['./features-modal.page.scss'],
})
export class FeaturesModalPage implements OnInit {

  featuresList = [{
    'name': 'BUSINESS',
    'backgroundImage': 'assets/features/business.jpg',
    'url': 'business'
  },
  {
    'name': 'ANNONCES',
    'backgroundImage': 'assets/features/annonces.jpg',
    'url': 'listings'
  },
  {
    'name': 'EXPLORE',
    'backgroundImage': 'assets/features/explore.jpeg',
    'url': 'tabs/tab3'
  },
  {
    'name': 'NEWS',
    'backgroundImage': 'assets/features/News.jpg',
    'url': 'tabs/news'
  },
  {
    'name': 'PHOTOS',
    'backgroundImage': 'assets/features/photos.jpg',
    'url': 'gallery'
  },
  {
    'name': 'EMERGENCY',
    'backgroundImage': 'assets/features/emergency.jpeg',
    'url': 'emergency'
  },
  {
    'name': 'SERVICES',
    'backgroundImage': 'assets/features/services.jpg',
    'url': 'service-view'
  },
  {
    'name': 'JOBS',
    'backgroundImage': 'assets/features/jobs.png',
    'url': 'jobs-view'
  },
  {
    'name': 'RADIO',
    'backgroundImage': 'assets/features/radio.jpg',
    'url': 'radio'
  },
  {
    'name': 'EVENTS',
    'backgroundImage': 'assets/features/events.jpg',
    'url': 'events'
  },
  {
    'name': 'MAPS',
    'backgroundImage': 'assets/features/maps.jpg',
    'url': 'map'
  },
  {
    'name': 'WEATHER',
    'backgroundImage': 'assets/features/weather.jpg',
    'url': 'weather'
  },
  {
    'name': 'BILL PAYMENTS',
    'backgroundImage': 'assets/features/billpayments.png',
    'url': 'bill'
  },
  {
    'name': 'QR CODE SCANNER',
    'backgroundImage': 'assets/features/qrscanner.jpg',
    'url': 'scan'
  },
  {
    'name': 'PUB',
    'backgroundImage': 'assets/features/pub.jpg',
    'url': 'pub'
  }
];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goPage(url) {
    this.router.navigate([url])
  }

}
