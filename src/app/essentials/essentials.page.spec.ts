import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EssentialsPage } from './essentials.page';

describe('EssentialsPage', () => {
  let component: EssentialsPage;
  let fixture: ComponentFixture<EssentialsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EssentialsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EssentialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
