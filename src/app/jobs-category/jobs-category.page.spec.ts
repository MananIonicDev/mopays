import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobsCategoryPage } from './jobs-category.page';

describe('JobsCategoryPage', () => {
  let component: JobsCategoryPage;
  let fixture: ComponentFixture<JobsCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsCategoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobsCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
