import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchAllPage } from './search-all.page';

describe('SearchAllPage', () => {
  let component: SearchAllPage;
  let fixture: ComponentFixture<SearchAllPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAllPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
