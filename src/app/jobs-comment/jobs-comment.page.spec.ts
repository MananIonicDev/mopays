import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobsCommentPage } from './jobs-comment.page';

describe('JobsCommentPage', () => {
  let component: JobsCommentPage;
  let fixture: ComponentFixture<JobsCommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsCommentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobsCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
