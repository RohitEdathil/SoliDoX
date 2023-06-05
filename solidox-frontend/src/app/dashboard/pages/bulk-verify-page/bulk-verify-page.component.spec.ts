import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkVerifyPageComponent } from './bulk-verify-page.component';

describe('BulkVerifyPageComponent', () => {
  let component: BulkVerifyPageComponent;
  let fixture: ComponentFixture<BulkVerifyPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkVerifyPageComponent]
    });
    fixture = TestBed.createComponent(BulkVerifyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
