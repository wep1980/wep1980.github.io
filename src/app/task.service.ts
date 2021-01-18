import { Injectable } from '@angular/core'; // Ja injeta na aplicação sem precisar instanciar
import { Tasks } from './tasks'; // Importe do objeto Task
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'


// Classe de serviço - RESPONSAVEL POR FAZER A COMUNICAÇÃO COM A APi

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiURL : string = environment.apiURL

  
  constructor(
    private http: HttpClient
  ) { }

  /**
   *  task -> Passando o obj Task (JSON) como parametro.
   * No angular as chamadas são assincronas, a requisição e feita no servidor e o Observable fica
   * observando esperando a resposta da requisição
   */ 
  salvar(task: Tasks) : Observable<Tasks>{
     return this.http.post<Tasks>(this.apiURL, task)
  }


  listar() : Observable<Tasks[]> {

    return this.http.get<Tasks[]>(this.apiURL);
  }


  /*
  void -> O metodo não retorna nada
  */
  delete(id : number) : Observable<void>{

    const url = `${this.apiURL}/${id}` // Passando a URL da api mais o id que sera deletado
    return this.http.delete<void>(url);
  }

  marcarComoConcluido(id : number) : Observable<Tasks> {
    const url = `${this.apiURL}/${id}/done` // Passando a URL da api mais o id que sera atualizado para feito

    /*
    {} -> enviando um objeto vazio pq o metodo patch exige que seja passado um objeto no corpo da requisição.
          Dentro do objeto poderia ser passado propriedades especificas para serem atualizadas
    */ 

    return this.http.patch<Tasks>(url, {}) 

  }
}
