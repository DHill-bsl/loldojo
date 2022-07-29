import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DojoWizardComponent } from './dojo-wizard.component';

describe('DojoWizardComponent', () => {
  let component: DojoWizardComponent;
  let fixture: ComponentFixture<DojoWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DojoWizardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DojoWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
