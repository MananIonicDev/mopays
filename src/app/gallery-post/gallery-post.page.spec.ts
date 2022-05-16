import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GalleryPostPage } from './gallery-post.page';

describe('GalleryPostPage', () => {
  let component: GalleryPostPage;
  let fixture: ComponentFixture<GalleryPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryPostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
