import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewsCategoryPage } from './news-category.page';

describe('NewsCategoryPage', () => {
  let component: NewsCategoryPage;
  let fixture: ComponentFixture<NewsCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsCategoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
