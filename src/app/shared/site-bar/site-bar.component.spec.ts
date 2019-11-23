import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteBarComponent } from './site-bar.component';

describe('SiteBarComponent', () => {
  let component: SiteBarComponent;
  let fixture: ComponentFixture<SiteBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
