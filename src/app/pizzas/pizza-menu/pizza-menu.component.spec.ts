import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaMenuComponent } from './pizza-menu.component';

describe('PizzaMenuComponent', () => {
  let component: PizzaMenuComponent;
  let fixture: ComponentFixture<PizzaMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzaMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
