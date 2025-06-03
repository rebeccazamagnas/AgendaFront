import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-cadastro-tarefas',
  imports: [
    CommonModule
  ],
  templateUrl: './cadastro-tarefas.component.html',
  styleUrl: './cadastro-tarefas.component.css'
})
export class CadastroTarefasComponent {
  categorias: any[] = []; 

//injecao de dependencia da classe httpClient
  http = inject(HttpClient);

//Função executada sempre que o componente é carregado
  ngOnInit(){

//fazendo uma consulta para obter as categorias na API
    this.http.get('http://localhost:8082/api/v1/categorias')
    .subscribe((response)=> { //capturando o retorno da API
      this.categorias= response as any[]; //imprimindo os dados no console
    });
  }
}
