import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserModalPhotosPage } from './user-modal-photos.page';

describe('UserModalPhotosPage', () => {
  let component: UserModalPhotosPage;
  let fixture: ComponentFixture<UserModalPhotosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserModalPhotosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserModalPhotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
