import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadPhotosPage } from './upload-photos.page';

describe('UploadPhotosPage', () => {
  let component: UploadPhotosPage;
  let fixture: ComponentFixture<UploadPhotosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPhotosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadPhotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
