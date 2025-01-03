import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajProstorComponent } from './dodaj-prostor.component';

describe('DodajProstorComponent', () => {
  let component: DodajProstorComponent;
  let fixture: ComponentFixture<DodajProstorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DodajProstorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodajProstorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
