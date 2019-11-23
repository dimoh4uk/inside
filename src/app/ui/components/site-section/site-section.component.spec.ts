import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSectionComponent } from './site-section.component';

describe('SiteSectionComponent', () => {
  let component: SiteSectionComponent;
  let fixture: ComponentFixture<SiteSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
