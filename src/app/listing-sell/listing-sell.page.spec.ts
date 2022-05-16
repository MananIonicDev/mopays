import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListingSellPage } from './listing-sell.page';

describe('ListingSellPage', () => {
  let component: ListingSellPage;
  let fixture: ComponentFixture<ListingSellPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingSellPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListingSellPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
