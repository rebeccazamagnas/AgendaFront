import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edicao-tarefas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edicao-tarefas.component.html',
  styleUrl: './edicao-tarefas.component.css'
})
export class EdicaoTarefasComponent {

  //atributos do componente
  id: string = ''; //para armazenar o id da tarefa a ser editada
  categorias: any[] = [];
  mensagem: string = ''; //para armazenar as categorias disponíveis

  //injeções de dependências
  http = inject(HttpClient); //para fazer requisições HTTP  
  fb = inject(FormBuilder); //para construir formulários reativos
  activated = inject(ActivatedRoute); //para acessar os parâmetros da rota

  //estrutura do formulário
  form = this.fb.group({
    titulo: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
    data: new FormControl('', [Validators.required]),
    hora: new FormControl('', [Validators.required]),
    finalizado: new FormControl('', [Validators.required]),
    categoriaId: new FormControl('', [Validators.required])
  });

  //função executada quando o componente é inicializado
  ngOnInit() {    
    //capturando o parâmetro 'id' da rota
    this.id = this.activated.snapshot.params['id'];    

    //fazendo uma requisição GET para buscar a tarefa pelo id
    this.http.get(environment.apiTarefas + '/tarefas/' + this.id)
      .subscribe((response: any) => {
        this.form.patchValue({

          titulo: response.titulo,
          data: response.data,
          hora: response.hora,
          finalizado: response.finalizado,
          categoriaId: response.categoria.id

        })
      });

    //fazendo uma requisição GET para buscar as categorias disponíveis
    this.http.get(environment.apiTarefas + '/categorias')
      .subscribe((response) => {
        this.categorias = response as any[];
      });
  }

  onSubmit(){
    this.http.put(environment.apiTarefas + '/tarefas/' + this.id, this.form.value)
    .subscribe((response: any) => {

      this.mensagem = `Tarefa ${response.titulo} atualizada com sucesso!`;
    })

  }
}