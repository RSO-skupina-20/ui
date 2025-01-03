import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledProstorovComponent } from './pregled-prostorov.component';

describe('PregledProstorovComponent', () => {
  let component: PregledProstorovComponent;
  let fixture: ComponentFixture<PregledProstorovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PregledProstorovComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledProstorovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
