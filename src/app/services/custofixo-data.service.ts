import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

//Auth
import { AuthService } from './auth.service';

//Interface
import { historicoInterface } from './../models/historico-interface';
import { custofixoInterface } from '../models/custofixo-interface'

@Injectable({
  providedIn: 'root'
})
export class CustofixoDataService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authService.getToken()
  });

  hists: Observable<any>;
  hist: Observable<any>;

  //Var atend
  cf: Observable<any>;
  cfs: Observable<any>;
  
  global_api = this.authService.global_api;

  public SelectHist: historicoInterface = {
    cfid: '',
    nf: '',
    recebimento: '',
    vencimento: '',
    valor: '',
    situacao: '',
    sc: ''
  };

  getAllCustoFixo(){
    const url_api = `${this.global_api}/api/cf`;
    return this.http.get<custofixoInterface>(url_api);
  }

  updateCustoFixo(cf){
    let token = this.authService.getToken();
    const url_api = `https://carajas-tic-dashboard.mybluemix.net/api/historicos?access_token=${token}`;
    return this.http.put<custofixoInterface>(url_api, cf ,{headers: this.headers})
    .pipe(map(data => data));
  }

  //?filter[where][situacaoSC]=0

  getCfById(cf_id: number){
    if(cf_id == 0){
      const url_api = `${this.global_api}/api/sc/h`;
      return this.http.get<historicoInterface>(url_api);
    }else{
      const url_api = `https://carajas-tic-dashboard.mybluemix.net/api/historicos/?filter[where][cfid]=${cf_id}`;
      return this.http.get<historicoInterface>(url_api);
    }
  }

  saveHist(hist: historicoInterface){
    let token = this.authService.getToken();
    const url_api = `https://carajas-tic-dashboard.mybluemix.net/api/historicos/?access_token=${token}`;
    return this.http.post<historicoInterface>(url_api, hist ,{headers: this.headers})
    .pipe(map(data => data));
  }

  getNameById(cf_id: number){
    if(cf_id == 0){
      const url_api = `${this.global_api}/api/sc/h`;
      return this.http.get<custofixoInterface>(url_api);
    }else{
      const url_api = `https://carajas-tic-dashboard.mybluemix.net/api/custofixos/?filter[where][cfhid]=${cf_id}`;
      return this.http.get<custofixoInterface>(url_api);
    }
    
  }

}
