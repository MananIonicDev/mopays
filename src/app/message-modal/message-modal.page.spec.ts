import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessageModalPage } from './message-modal.page';

describe('MessageModalPage', () => {
  let component: MessageModalPage;
  let fixture: ComponentFixture<MessageModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessageModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
