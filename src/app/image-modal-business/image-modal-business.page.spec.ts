import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImageModalBusinessPage } from './image-modal-business.page';

describe('ImageModalBusinessPage', () => {
  let component: ImageModalBusinessPage;
  let fixture: ComponentFixture<ImageModalBusinessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageModalBusinessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageModalBusinessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
