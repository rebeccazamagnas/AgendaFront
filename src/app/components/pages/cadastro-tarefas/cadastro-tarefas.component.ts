import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cadastro-tarefas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-tarefas.component.html',
  styleUrl: './cadastro-tarefas.component.css'
})
export class CadastroTarefasComponent {

  //Atributos
  categorias: any[] = []; //array de objetos
  mensagem: string = ''; //texto vazio

  //injeções de dependência
  http = inject(HttpClient); //consumo das APIs
  fb = inject(FormBuilder); //construção dos formulários

  //estrutura do formulário
  form = this.fb.group({
    titulo: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
    data: new FormControl('', [Validators.required]),
    hora: new FormControl('', [Validators.required]),
    finalizado : new FormControl('', [Validators.required]),
    categoriaId : new FormControl('', [Validators.required])
  });

  //função executada sempre que o componente é carregado
  ngOnInit() {
    //fazendo uma consulta para obter as categorias na API
    this.http.get(environment.apiTarefas + '/categorias')
      .subscribe((response) => { //capturando o retorno da API
        //armazenando os dados obtidos dentro do atributo 'categorias'
        this.categorias = response as any[];
      });
  }

  //função para capturar o evento de submit do formulário
  onSubmit() {
    //fazendo uma requisição HTTP POST para cadastrar a tarefa na API
    this.http.post(environment.apiTarefas + '/tarefas', this.form.value)
      .subscribe((response: any) => { //capturando o retorno obtido da API
        //gerando uma mensagem de sucesso
        this.mensagem = `Tarefa ${response.titulo}, cadastrado com sucesso.`;
        //limpar os campos do formulário
        this.form.reset();
      })
  }
}
