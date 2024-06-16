import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPasswordFailureComponent } from './set-password-failure.component';

describe('SetPasswordFailureComponent', () => {
  let component: SetPasswordFailureComponent;
  let fixture: ComponentFixture<SetPasswordFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetPasswordFailureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetPasswordFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
