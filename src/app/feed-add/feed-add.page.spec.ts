import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeedAddPage } from './feed-add.page';

describe('FeedAddPage', () => {
  let component: FeedAddPage;
  let fixture: ComponentFixture<FeedAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
