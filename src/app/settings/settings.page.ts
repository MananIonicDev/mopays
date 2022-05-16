import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage  {

  constructor(
    public router: Router
  ) {

  
  }

  goColor(){
    this.router.navigate(['/default-color'])
  }
}