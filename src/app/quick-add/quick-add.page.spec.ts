import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuickAddPage } from './quick-add.page';

describe('QuickAddPage', () => {
  let component: QuickAddPage;
  let fixture: ComponentFixture<QuickAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuickAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
