import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GalleryListPage } from './gallery-list.page';

describe('GalleryListPage', () => {
  let component: GalleryListPage;
  let fixture: ComponentFixture<GalleryListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
