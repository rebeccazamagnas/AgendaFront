import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-consulta-tarefas',
  imports: [
    CommonModule,
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

  onSubmit() {
  const dataMin = this.form.value.dataMin;
  const dataMax = this.form.value.dataMax;

  this.http.get<any[]>(environment.apiTarefas + '/tarefas/' + dataMin + '/' + dataMax)
    .subscribe((response) => {
      this.tarefas = response;  // <-- Atualizar a variável para refletir no template
      console.table(this.tarefas);
    });
}



  }


