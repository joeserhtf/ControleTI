import { ScInterface } from './../../../../models/sc-interface';
import { DataApiService } from 'src/app/services/data-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-incluir',
  templateUrl: './incluir.component.html',
  styleUrls: ['./incluir.component.css']
})
export class IncluirComponent implements OnInit {

  constructor(private dataApi: DataApiService, private route: ActivatedRoute) { }
  public sc: ScInterface = {
    numerosc: null,
    solicitante: null,
    tipo: null,
    chamado: null,
    aprovador: null,
    situacao: null
  };
  
  ngOnInit() {
    const sc_id = this.route.snapshot.params['id'];
    this.getDetails(sc_id);
  }
  
  getDetails(id: string){
    this.dataApi.getScById(id).subscribe(sc => (this.sc = sc));
  }
  
}
