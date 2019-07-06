import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestonesPageComponent } from './milestones-page.component';

describe('MilestonesPageComponent', () => {
  let component: MilestonesPageComponent;
  let fixture: ComponentFixture<MilestonesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilestonesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestonesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
