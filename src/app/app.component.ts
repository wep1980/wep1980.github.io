import { Component, OnInit } from '@angular/core'; // OnInit -> importe para incializar uma função ou metodo assim que o componente for inicializado
import { FormControl, FormGroup, Validators } from '@angular/forms'; // FormGroup -> Classe que apresenta os campos do formulario
import { Tasks } from './tasks'; // importe do obj Task
import { TaskService } from './task.service'; // Importe do serviço que se conecta a APi


// CLASSE QUE FAZ A COMUNICAÇÃO ENTRE O TEMPLATE(PAGINA HTML) E OS DADOS MANIPULADOS AQUI DENTRO

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 

  tasks : Tasks[] = [] // Inicializando com array vazio

  // form -> variavel utilizada no form da pagina HTML
  form : FormGroup = new FormGroup({

    /**
     * description -> Variavel igual a criada na APi e que serve como referencia na pagina HTML para 
     * capturar a descrição digitada na tela.
     * 
     * O valor inicial e uma String vazia, FormControl-> Objeto JavaScript.
     * [Validators.required, Validators.minLength(4)] -> O campo descrição e requerido e tem q ter no min 4 digitos
     */
    description : new FormControl('', [Validators.required, Validators.minLength(4)])
  })

  constructor(
    private service : TaskService
  ){}


  /**
   * Lista todos os tasks
   * Metodo executado assim que o componente e mostrado na tela
   */ 
  ngOnInit(){
    this.findAll()
  }

  findAll(){
    this.service.listar().subscribe(tasksList => this.tasks = tasksList)
  }

  /*
    ...this.form.value -> Tranforma o obj javaScript em obj Task
    subscribe() -> Trata o retorno da requisição
  */
  submit(){
   
    const tasks : Tasks = { ...this.form.value } // Cria uma task com os valores do formulario
    this.service.salvar(tasks) // Chama o metodo salvar do service
                .subscribe(savedTask => {
                  this.tasks.push(savedTask) // Adicionando a Task na lista de tasks
                  this.form.reset() // Limpa o formulario depois de salvar
                })
              }


  delete(task : Tasks){
    
    this.service.delete(task.id).subscribe({
      next : (response) => this.findAll()
    })
  }  
  
  
  done(tasks : Tasks){
    this.service.marcarComoConcluido(tasks.id).subscribe({

      /**
       * A APi esta retornando uma Task atualizada
       */
      next : (todoAtualizado) => {
        tasks.done = todoAtualizado.done
        tasks.doneDate = todoAtualizado.doneDate
      }
    })
  }
}
