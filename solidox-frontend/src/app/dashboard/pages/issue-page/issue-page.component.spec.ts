import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuePageComponent } from './issue-page.component';

describe('IssuePageComponent', () => {
  let component: IssuePageComponent;
  let fixture: ComponentFixture<IssuePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssuePageComponent]
    });
    fixture = TestBed.createComponent(IssuePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
