import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-announcement-details',
  templateUrl: './announcement-details.page.html',
  styleUrls: ['./announcement-details.page.scss'],
})
export class AnnouncementDetailsPage implements OnInit {

  data: any;

  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.data) {
        this.data = JSON.parse(params.data);
        console.log('announcement', this.data)
      }
    });
  }

  ngOnInit() {
  }

}
