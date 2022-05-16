import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobsAddPage } from './jobs-add.page';

describe('JobsAddPage', () => {
  let component: JobsAddPage;
  let fixture: ComponentFixture<JobsAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobsAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
