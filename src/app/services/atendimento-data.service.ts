import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

//Auth
import { AuthService } from './auth.service';

//Interface
import { atendimentoInterface } from '../models/atendimento-interface';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoDataService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  //Var atend
  atend: Observable<any>;
  atends: Observable<any>;
  global_api = this.authService.global_api;
  
  public selectedAte: atendimentoInterface = {
    id: null,
    nome: '',
    unidade: '',
    presente: 0,
    horario: ''
  };

  getAllAtendimentos(){
    const url_api = `${this.global_api}/a`;
    return this.http.get<atendimentoInterface>(url_api);
  }

  updateAtendimentos(atend){
    const url_api = `${this.global_api}/${atend.id}`;
    return this.http.put<atendimentoInterface>(url_api, atend ,{headers: this.headers})
    .pipe(map(data => data));
  }


}

