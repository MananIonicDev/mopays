import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreImagesPage } from './explore-images.page';

describe('ExploreImagesPage', () => {
  let component: ExploreImagesPage;
  let fixture: ComponentFixture<ExploreImagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreImagesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreImagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
