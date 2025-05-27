import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
    //criando um objeto da classe HttpClient
    private http = inject(HttpClient);

    //função executada sempre que a página é aberta
    ngOnInit() {

      //executando uma requisição para o endpoint de consulta de categorias
      this.http.get('http://localhost:8082/api/v1/categorias') 
        .subscribe((dados) => { //capturando os dados obtidos
            console.table(dados);
        });
    }
}
