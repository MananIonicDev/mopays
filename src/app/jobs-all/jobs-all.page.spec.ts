import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobsAllPage } from './jobs-all.page';

describe('JobsAllPage', () => {
  let component: JobsAllPage;
  let fixture: ComponentFixture<JobsAllPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsAllPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobsAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
