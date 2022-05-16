import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GalleryCommentPage } from './gallery-comment.page';

describe('GalleryCommentPage', () => {
  let component: GalleryCommentPage;
  let fixture: ComponentFixture<GalleryCommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryCommentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
