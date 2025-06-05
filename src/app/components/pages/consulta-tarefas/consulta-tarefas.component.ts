import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-consulta-tarefas',
  imports: [
    CommonModule
  ],
  templateUrl: './consulta-tarefas.component.html',
  styleUrl: './consulta-tarefas.component.css'
})
export class ConsultaTarefasComponent {

  tarefas: any[] = [];

  http = inject(HttpClient);

  ngOnInit(){

    this.http.get(environment.apiTarefas + '/tarefas')
    .subscribe((response) => {
      console.table(response);
    })



  }

}
