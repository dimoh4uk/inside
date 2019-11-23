import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SiteBurgerComponent } from './site-burger.component';


describe('SiteBurgerComponent', () => {
  let component: SiteBurgerComponent;
  let fixture: ComponentFixture<SiteBurgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteBurgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteBurgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
