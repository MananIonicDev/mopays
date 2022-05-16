import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiceCommentPage } from './service-comment.page';

describe('ServiceCommentPage', () => {
  let component: ServiceCommentPage;
  let fixture: ComponentFixture<ServiceCommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCommentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
