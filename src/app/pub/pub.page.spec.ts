import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PubPage } from './pub.page';

describe('PubPage', () => {
  let component: PubPage;
  let fixture: ComponentFixture<PubPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PubPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
