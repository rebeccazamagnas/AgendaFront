import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {RouterLink} from '@angular/router';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-consulta-tarefas',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './consulta-tarefas.component.html',
  styleUrl: './consulta-tarefas.component.css'
})
export class ConsultaTarefasComponent {

  tarefas: any[] = [];

  http = inject(HttpClient);
  fb = inject(FormBuilder);

  form = this.fb.group ({
    dataMin : new FormControl ('', [Validators.required]),
    dataMax : new FormControl('', [Validators.required])

  });

   ngOnInit(): void {
    this.carregarTodasTarefas(); // Carrega tudo ao iniciar a página
  }

  carregarTodasTarefas(): void {
    this.http.get<any[]>(environment.apiTarefas + '/tarefas')
      .subscribe((response) => {
        this.tarefas = response;
        console.table(this.tarefas);
      });
  }

  limparFiltros(): void {
  this.form.reset(); // limpa os campos do formulário
  this.carregarTodasTarefas(); // recarrega todas as tarefas
}

  onSubmit() {
  const dataMin = this.form.value.dataMin;
  const dataMax = this.form.value.dataMax;

  this.http.get<any[]>(environment.apiTarefas + '/tarefas/' + dataMin + '/' + dataMax)
    .subscribe((response) => {
      this.tarefas = response;  // <-- Atualizar a variável para refletir no template
      console.table(this.tarefas);
    });
}

  onDelete(tarefa: any){

    if(confirm(`Deseja excluir a tarefa: ${tarefa.titulo}?`)){
      //realizando a exclusão da tarefa na api
      this.http.delete(environment.apiTarefas + "/tarefas/" + tarefa.id)

      .subscribe((response)=> {
        //capturando a resposta da API
        alert(`Tarefa ${tarefa.titulo} excluída com sucesso`);
        this. ngOnInit();
      })

      
    }



  }



  }


