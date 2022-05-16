import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobsViewPage } from './jobs-view.page';

describe('JobsViewPage', () => {
  let component: JobsViewPage;
  let fixture: ComponentFixture<JobsViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobsViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
