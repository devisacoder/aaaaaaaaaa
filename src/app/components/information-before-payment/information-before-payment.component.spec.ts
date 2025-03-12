import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationBeforePaymentComponent } from './information-before-payment.component';

describe('InformationBeforePaymentComponent', () => {
  let component: InformationBeforePaymentComponent;
  let fixture: ComponentFixture<InformationBeforePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationBeforePaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationBeforePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
