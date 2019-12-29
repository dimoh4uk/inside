import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReelComponent } from './show-reel.component';

describe('ShowReelComponent', () => {
  let component: ShowReelComponent;
  let fixture: ComponentFixture<ShowReelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowReelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowReelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
