import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutoCompletePage } from './auto-complete.page';

describe('AutoCompletePage', () => {
  let component: AutoCompletePage;
  let fixture: ComponentFixture<AutoCompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCompletePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutoCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
