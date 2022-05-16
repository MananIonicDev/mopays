import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessCommentPage } from './business-comment.page';

describe('BusinessCommentPage', () => {
  let component: BusinessCommentPage;
  let fixture: ComponentFixture<BusinessCommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessCommentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
