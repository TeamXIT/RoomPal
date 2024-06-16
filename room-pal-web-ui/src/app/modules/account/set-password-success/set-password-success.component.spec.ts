import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPasswordSuccessComponent } from './set-password-success.component';

describe('SetPasswordSuccessComponent', () => {
  let component: SetPasswordSuccessComponent;
  let fixture: ComponentFixture<SetPasswordSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetPasswordSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetPasswordSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
