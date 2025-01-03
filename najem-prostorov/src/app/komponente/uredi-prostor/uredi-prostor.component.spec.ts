import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrediProstorComponent } from './uredi-prostor.component';

describe('UrediProstorComponent', () => {
  let component: UrediProstorComponent;
  let fixture: ComponentFixture<UrediProstorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UrediProstorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrediProstorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
