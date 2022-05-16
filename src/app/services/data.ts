import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  classified_categoryListRef: AngularFireList<any>;
  classified_subcategoryListRef: AngularFireList<any>;
  itemListRef: AngularFireList<any>;
  eventListRef: AngularFireList<any>;
  jobCatListRef: AngularFireList<any>;
  jobListRef: AngularFireList<any>;
  bookingListRef: AngularFireList<any>;
  bookingCatListRef: AngularFireList<any>;
  galleryCatListRef: AngularFireList<any>;
  galleryListRef: AngularFireList<any>;
  billingCatRef: AngularFireList<any>;
  serviceCatRef: AngularFireList<any>;
  serviceListRef: AngularFireList<any>;
  myeventListRef: AngularFireList<any>;
  root;

  constructor(private db: AngularFireDatabase) { 
    
  }

  setRoot(root){
    this.root = root;
  }

  getRoot(){
    return this.root;
  }

  // Get List
  getCategoryList() {
    this.classified_categoryListRef = this.db.list('/classified_category');
    return this.classified_categoryListRef;
  }

  getServiceCat(){
    this.serviceCatRef = this.db.list('/service_category');
    return this.serviceCatRef;
  }

  getServiceList(){
    this.serviceListRef = this.db.list('/service_provider');
    return this.serviceListRef;
  }

  getGalleryList(){
    this.galleryListRef = this.db.list('/gallery_list');
    return this.galleryListRef;
  }

  getBookingList(){
    this.bookingListRef = this.db.list('/booking_shop');
    return this.bookingListRef;
  }

  getGalleyCat(){
    this.galleryCatListRef = this.db.list('/gallery_category');
    return this.galleryCatListRef;
  }

  getBillings(){
    this.billingCatRef = this.db.list('/billing');
    return this.billingCatRef;
  }

  getBookingCat(){
    this.bookingCatListRef = this.db.list('/bookings');
    return this.bookingCatListRef;
  }

  getJobList(){
    this.jobListRef = this.db.list('/jobs');
    return this.jobListRef
  }

  getEventList(){
    this.eventListRef = this.db.list('/events');
    return this.eventListRef;
  }

  getMyEventList(id){
    this.myeventListRef = this.db.list('/events', ref => ref.orderByChild('userId').equalTo(id))
    return this.myeventListRef;
  }

  getJobCatList(){
    this.jobCatListRef = this.db.list('/job_category');
    return this.jobCatListRef;
  }

  getSubCategoryList(){
    this.classified_subcategoryListRef = this.db.list('/classified_subcategory');
    return this.classified_subcategoryListRef;
  } 

  getSaleItemList(){
    this.itemListRef = this.db.list('/items_sell');
    return this.itemListRef;
  }
}