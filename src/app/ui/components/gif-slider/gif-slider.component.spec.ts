import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GifSliderComponent } from './gif-slider.component';

describe('GifSliderComponent', () => {
  let component: GifSliderComponent;
  let fixture: ComponentFixture<GifSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GifSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GifSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
