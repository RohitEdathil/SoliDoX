import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkIssuePageComponent } from './bulk-issue-page.component';

describe('BulkIssuePageComponent', () => {
  let component: BulkIssuePageComponent;
  let fixture: ComponentFixture<BulkIssuePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkIssuePageComponent]
    });
    fixture = TestBed.createComponent(BulkIssuePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
