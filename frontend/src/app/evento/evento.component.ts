import { tap } from 'rxjs/operators';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Evento } from './model/evento.model';
import { EventoService } from './service/evento.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
  providers: [EventoService]
})


@Injectable()
export class EventoComponent implements OnInit {

  @ViewChild('formulario') public f: NgForm
  
  private evento: Evento
  
  private mostrarEvento: boolean = false
  @Output() eventoSalvoEmiter = new EventEmitter<Evento>();

  constructor(private eventoService:EventoService) { }

  public salvarDadosEvento():void {
    
    this.evento = new Evento(
      this.f.form.value.tipoEvento,
      this.f.form.value.outrasInformacoes,
      this.f.form.value.dataHoraDeTermino,
      this.f.form.value.dataHoraDeInicio,
      this.f.form.value.numeroPessoas)

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
