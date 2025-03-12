import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsufficientFundsModalComponent } from './insufficient-funds-modal.component';

describe('InsufficientFundsModalComponent', () => {
  let component: InsufficientFundsModalComponent;
  let fixture: ComponentFixture<InsufficientFundsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsufficientFundsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsufficientFundsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
