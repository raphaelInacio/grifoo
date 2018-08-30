import { TestBed, inject } from '@angular/core/testing';

import { OrcamentoClienteService } from './orcamento-cliente.service';

describe('OrcamentoClienteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrcamentoClienteService]
    });
  });

  it('should be created', inject([OrcamentoClienteService], (service: OrcamentoClienteService) => {
    expect(service).toBeTruthy();
  }));
});
