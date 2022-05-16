import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.page.html',
  styleUrls: ['./search-all.page.scss'],
})
export class SearchAllPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  searchItem(){
    this.router.navigate(['/listing-search'])
  }

  searchExplore(){
    this.router.navigate(['/tabs/tab3'])
  }

  searchMap(){
    this.router.navigate(['/map'])
  }

  searchJobs(){
    this.router.navigate(['/jobs-all'])
  }

  searchService(){
    this.router.navigate(['/service-view'])
  }

  searchBusiness(){
    this.router.navigate(['/business'])
  }

  searchPeople(){
    this.router.navigate(['/people'])
  }

}
