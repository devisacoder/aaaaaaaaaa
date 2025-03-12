import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargerComponent } from './recharger.component';

describe('RechargerComponent', () => {
  let component: RechargerComponent;
  let fixture: ComponentFixture<RechargerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechargerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechargerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
