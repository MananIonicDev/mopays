import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuestFeedAddPage } from './guest-feed-add.page';

describe('GuestFeedAddPage', () => {
  let component: GuestFeedAddPage;
  let fixture: ComponentFixture<GuestFeedAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestFeedAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuestFeedAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
