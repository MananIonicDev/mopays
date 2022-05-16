import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PubCategoryPage } from './pub-category.page';

describe('PubCategoryPage', () => {
  let component: PubCategoryPage;
  let fixture: ComponentFixture<PubCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubCategoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PubCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
