import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyExtPageComponent } from './verify-ext-page.component';

describe('VerifyExtPageComponent', () => {
  let component: VerifyExtPageComponent;
  let fixture: ComponentFixture<VerifyExtPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyExtPageComponent]
    });
    fixture = TestBed.createComponent(VerifyExtPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
