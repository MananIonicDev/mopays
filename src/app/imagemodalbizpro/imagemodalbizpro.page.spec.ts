import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImagemodalbizproPage } from './imagemodalbizpro.page';

describe('ImagemodalbizproPage', () => {
  let component: ImagemodalbizproPage;
  let fixture: ComponentFixture<ImagemodalbizproPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagemodalbizproPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImagemodalbizproPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
