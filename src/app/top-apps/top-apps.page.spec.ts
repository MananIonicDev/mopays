import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopAppsPage } from './top-apps.page';

describe('TopAppsPage', () => {
  let component: TopAppsPage;
  let fixture: ComponentFixture<TopAppsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopAppsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopAppsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
