import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

//Auth
import { AuthService } from './auth.service';

//Interface
import { projetosInterface } from './../models/projetos-interface';
import { orcamentoInterface } from './../models/orcamento-interface';
import { logInterface } from '../models/log-interface';


@Injectable({
  providedIn: 'root'
})
export class ProjetosService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authService.getToken()
  });


  public projetos: projetosInterface = {
    id: null,
    nome: "",
    codigo: null,
    orcamento: null,
    indispensavel: null,
    empresa: "",
    cdppai: null,
    area: "",
    subarea: "",
    kuser: "",
    kcontato: "",
    solicitante: "",
    status: null,
    prioridade: null,    
    inicio: "",
    previsao: "",
    objetivo: "",
    beneficioqt: "",
    beneficioql: "",
    escopo: ""
  };

  public orcamentoss: orcamentoInterface = {
    id: null,
    idprojeto: null,
    ano: "",
    valor: 0,
    comentario: ""
  };

  public logss: logInterface = {
    id: null,
    idprojeto: null,
    titulo: "",
    comentario: "",
    tipo: "",
    usuario: "",
    data: ""
  };


  getAllProjetos(){
    const url_api = 'http://localhost:21181/api/proj/';
    return this.http.get<projetosInterface>(url_api);
  }

  //?filter[where][and][0][userid]=1&filter[where][and][1][ano]=2019

  getProjetoD(np){
    const url_api = `http://localhost:21181/api/proj/${np}`;
    return this.http.get<projetosInterface>(url_api);
  }

  getOrçamento(np){
    const url_api = `http://localhost:21181/api/proj/orc/${np}`;
    return this.http.get<orcamentoInterface>(url_api);
  }

  getLogs(np){
    const url_api = `http://localhost:21181/api/proj/log/${np}`;
    return this.http.get<orcamentoInterface>(url_api);
  }

  saveLog(log){
    let token = this.authService.getToken();
    const url_api = `https://carajas-tic-dashboard.mybluemix.net/api/logpjs?access_token=${token}`;
    return this.http.put<logInterface>(url_api, log ,{headers: this.headers})
    .pipe(map(data => data));
  }

  saveOrcamento(orca){
    let token = this.authService.getToken();
    const url_api = `https://carajas-tic-dashboard.mybluemix.net/api/orcamentopjs?access_token=${token}`;
    return this.http.put<orcamentoInterface>(url_api, orca ,{headers: this.headers})
    .pipe(map(data => data));
  }

  saveProjeto(projeto){
    let token = this.authService.getToken();
    const url_api = `https://carajas-tic-dashboard.mybluemix.net/api/projetos?access_token=${token}`;
    return this.http.post<projetosInterface>(url_api, projeto ,{headers: this.headers})
    .pipe(map(data => data));
  }












}
