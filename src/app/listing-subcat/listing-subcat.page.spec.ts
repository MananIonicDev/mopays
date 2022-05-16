import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListingSubcatPage } from './listing-subcat.page';

describe('ListingSubcatPage', () => {
  let component: ListingSubcatPage;
  let fixture: ComponentFixture<ListingSubcatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingSubcatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListingSubcatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
