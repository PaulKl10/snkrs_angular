import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourbeEthComponent } from './courbe-eth.component';

describe('CourbeEthComponent', () => {
  let component: CourbeEthComponent;
  let fixture: ComponentFixture<CourbeEthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourbeEthComponent]
    });
    fixture = TestBed.createComponent(CourbeEthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
