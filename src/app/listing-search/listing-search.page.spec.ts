import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListingSearchPage } from './listing-search.page';

describe('ListingSearchPage', () => {
  let component: ListingSearchPage;
  let fixture: ComponentFixture<ListingSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListingSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
