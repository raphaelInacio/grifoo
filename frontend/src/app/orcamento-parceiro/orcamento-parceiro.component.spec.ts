import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoParceiroComponent } from './orcamento-parceiro.component';

describe('OrcamentoParceiroComponent', () => {
  let component: OrcamentoParceiroComponent;
  let fixture: ComponentFixture<OrcamentoParceiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrcamentoParceiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrcamentoParceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
