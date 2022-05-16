import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GallerySlidePage } from './gallery-slide.page';

describe('GallerySlidePage', () => {
  let component: GallerySlidePage;
  let fixture: ComponentFixture<GallerySlidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GallerySlidePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GallerySlidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
