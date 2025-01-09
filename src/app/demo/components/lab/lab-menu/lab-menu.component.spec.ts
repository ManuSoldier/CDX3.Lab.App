import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabMenuComponent } from './lab-menu.component';

describe('LabMenuComponent', () => {
  let component: LabMenuComponent;
  let fixture: ComponentFixture<LabMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LabMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
