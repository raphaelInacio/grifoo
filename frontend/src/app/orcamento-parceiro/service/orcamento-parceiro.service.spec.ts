import { TestBed, inject } from '@angular/core/testing';

import { OrcamentoParceiroService } from './orcamento-parceiro.service';

describe('OrcamentoParceiroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrcamentoParceiroService]
    });
  });

  it('should be created', inject([OrcamentoParceiroService], (service: OrcamentoParceiroService) => {
    expect(service).toBeTruthy();
  }));
});
