import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScratchPage } from './scratch.page';

describe('ScratchPage', () => {
  let component: ScratchPage;
  let fixture: ComponentFixture<ScratchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScratchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScratchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
