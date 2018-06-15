import { DuracaoEvento } from './model/duracaoEvento.model';
import { TipoEvento } from './model/tipoEvento.model';
import { tap } from 'rxjs/operators';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Evento } from './model/evento.model';
import { EventoService } from './service/evento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConvidadosEvento } from './model/convidadosEvento.model';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
  providers: [EventoService]
})


@Injectable()
export class EventoComponent implements OnInit {

  @ViewChild('formulario') public f: NgForm
  @Output() eventoSalvoEmiter = new EventEmitter<Evento>();

  private evento: Evento
  public tiposDeEvento: Array<TipoEvento>;
  public listaDuracaoDeEvento: Array<DuracaoEvento>;
  public listaConvidadosEvento: Array<ConvidadosEvento>;
  private mostrarEvento: boolean = false

  constructor(private eventoService: EventoService) {
    
    this.tiposDeEvento = [
      new TipoEvento(1, "Casamento"),
      new TipoEvento(2, "Aniversario"),
      new TipoEvento(3, "Debutante"),
      new TipoEvento(4, "Corporativo"),
      new TipoEvento(5, "Formatura"),
      new TipoEvento(6, "Outros...")
    ]

    this.listaDuracaoDeEvento = [
      new DuracaoEvento(1, "1 hora"),
      new DuracaoEvento(2, "2 horas"),
      new DuracaoEvento(3, "3 horas"),
      new DuracaoEvento(4, "4 horas ou mais")
    ]

    this.listaConvidadosEvento = [
      new ConvidadosEvento(1, "50"),
      new ConvidadosEvento(2, "70"),
      new ConvidadosEvento(3, "90"),
      new ConvidadosEvento(4, "100"),
      new ConvidadosEvento(5, "150 ou mais"),
    ]
  }

  public salvarDadosEvento(): void {

    this.evento = new Evento(
      this.f.form.value.tipoEvento.nome,
      this.f.form.value.outrasInformacoes,
      this.f.form.value.duracaoEvento.nome,
      this.f.form.value.dataHoraDeInicio,
      this.f.form.value.numeroPessoas.nome)

    this.eventoService
      .salvarEvento(this.evento)
      .pipe(tap((response: Evento) => {
        console.log(`evento salvo com sucesso: ${JSON.stringify(response)}`)
        this.evento = response
        this.eventoSalvoEmiter.emit(response)
      }))
      .subscribe()
  }

  ngOnInit() {
  }

}
