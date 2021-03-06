import { exceltimeInterface } from './../../../../models/excel-time-interface';
import { ExcelService } from './../../../../services/shared/excel.service';
import { TimesheetService } from './../../../../services/timesheet.service';
import { Time, NgForOf } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from './../../../../models/user-interface';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { portugues } from './../../../../../interfaces/datatables.es';
import { Subject, Observable, empty } from 'rxjs';
import moment from 'moment';
import { Horariointerface } from './../../../../models/horario-interface';
import { isNullOrUndefined, isNull } from 'util';
import { timestamp } from 'rxjs/operators';
import { add } from 'timelite/time';
import { sub } from 'timelite/time';
import { str } from 'timelite/time';
import { colaboradorInterface } from 'src/app/models/colaborador-interface';



@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})

export class TimesheetComponent implements OnInit {

  public horario: Horariointerface = {
    userid: 0,
    datat: '',
    total: '',
    e1: '',
    s1: '',
    e2: '',
    s2: '',
    e3: '',
    s3: '',
    obs: ''
  };

  public exceli: exceltimeInterface = {
    dia: '',
    data: '',
    e1: '',
    s1: '',
    e2: '',
    s2: '',
    e3: '',
    s3: '',
    obs: ''
  };

  public worker: colaboradorInterface;

  months = [
    { name: "Janeiro", value: "01" },
    { name: "Fevereiro", value: "02" },
    { name: "Março", value: "03" },
    { name: "Abril", value: "04" },
    { name: "Maio", value: "05" },
    { name: "Junho", value: "06" },
    { name: "Julho", value: "07" },
    { name: "Agosto", value: "08" },
    { name: "Setembro", value: "09" },
    { name: "Outubro", value: '10' },
    { name: "Novembro", value: '11' },
    { name: "Dezembro", value: '12' },
  ]

  years = [
    { value: '2019' },
    { value: '2020' }
  ]


  // sd = moment().startOf('month').add(1, 'days').locale('pt-br').format('dddd');
  user: UserInterface;
  totalhora;
  public isAdm: boolean = false;
  data: Horariointerface;
  fd = moment().startOf('month').locale('pt-br').format('dddd');
  i: number;
  selectedworker = null;
  public datanow = new Date();
  selectedMonth; //String(this.datanow.getMonth());
  selectedYear = String(this.datanow.getFullYear());
  public days;
  public excel;
  constructor(private http: HttpClient, private authService: AuthService, private timesheetService: TimesheetService, private excelService: ExcelService) { }

  monthAT(){
    if((moment().month()) < 10){
        this.selectedMonth = String((moment().month()+1));
    }else{
      this.selectedMonth = String((moment().month()+1));
    }
  }

  totalhoras(e1, s1, e2, s2, e3, s3){
    var hora1;
    var hora2;
    var hora3;
    var tots;
    hora1 = sub([s1,e1]);
    hora2 = sub([s2,e2]);
    hora3 = sub([s3,e3]);
    hora1 = str(hora1);
    hora2 = str(hora2);
    hora3 = str(hora3);
    tots = add([hora1, hora2]);
    tots = str(tots);
    tots = add([tots, hora3]);
    this.totalhora = str(tots);
    return this.totalhora;
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.excel, 'Timesheet');
  }

  diames(ano: string, mes: string, i: number) {
    return moment(`01${mes}${ano}`, "DDMMYYYY").startOf('month').locale('pt-br').add(`${i}`, 'days').format('dddd');
  }

  getDaysToExcel(): void {
    this.timesheetService.getDaysByYearAndMonth(this.user.id ,this.selectedYear, this.selectedMonth).subscribe((excel: exceltimeInterface) => {
      this.excel = excel;
    });
    setTimeout(() => {
      var i = 0;
      this.excel.forEach(element => {
        delete this.excel[i].id;
        delete this.excel[i].userid;
        delete this.excel[i].id;
        i++;
      });
    }, 1000);  
  }

  getDays(): void {
    this.timesheetService.getDaysByYearAndMonth(this.selectedworker ,this.selectedYear, this.selectedMonth).subscribe((days: Horariointerface) => {
      this.days = days;
    });
  }

  getcolab(){
    this.timesheetService.getcolaborador().subscribe((worker: colaboradorInterface ) => { 
      this.worker = worker})
  }

  onAdmUser(): void{
    if(this.user.codUser == '002291' || this.user.id == 2){
      this.isAdm = true;
    }else{
      this.isAdm = false;
    }
  }

  UpdateDay(day: Horariointerface) {
    this.timesheetService.updateDay(day).subscribe();
  }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this. monthAT();
    this.getcolab();
    this.selectedworker = this.user.codUser;
    this.onAdmUser();
    this.fd;
    setTimeout(() => {
      this.getDays();
    }, 500); 
    this.getDaysToExcel();

  }


}
