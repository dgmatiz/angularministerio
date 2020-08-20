import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AlertService} from '../../services/alert.service';
import {CommunicatorService} from '../../services/communicator.service';
import {OptionsSelect, TypeOption} from '../../core/model/option-select';
import {ResponseValidation} from '../../core/model/response-validation';


@Component({
  selector: 'app-forms',
  templateUrl: './minforms.component.html',
  styleUrls: ['./minforms.component.css']
})
export class MinformsComponent implements OnInit, OnDestroy {
  selectOption: any;
  registers:any;
  cols:any;
  optionsNumber: TypeOption[] = [
    {name: '1', code: 1},
    {name: '2', code: 2},
    {name: '3', code: 3},
    {name: '4', code: 4}
  ];
  email: string;
  optionsAlpha: any;
  selectOptionAlpha: any;
  selectOptionNumber: number;
  private selectOptionNumber$ = new Subject<any>();
  private unsubscribe$ = new Subject<void>();

  constructor(
    private communicatorService: CommunicatorService,
    private alertService: AlertService) {
    this.getSelectOptionsNumber$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result:number) => {
        if(result == 1){
          this.loadItemsAlpha()
        }
      });
  }

  private getSelectOptionsNumber$(): Observable<any> {
    return this.selectOptionNumber$.asObservable();
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'email', header: 'Email' },
      { field: 'optionNumber', header: 'Number' },
      { field: 'optionAplha', header: 'Alpha' },
    ];

    this.registers = this.communicatorService.getTable()
      /*[
      {email:'dg@gmail.com', optionNumber: 1, optionAplha:'a'},
      {email:'dg2@gmail.com', optionNumber: 2, optionAplha:'b'},
      {email:'dg3@gmail.com', optionNumber: 3, optionAplha:'c'}]*/
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  validateEmail() {
    this.communicatorService.validateEmail(this.email)
      .subscribe((response: any) => {
        if (response != null ) {
          this.alertService.error(response.email, {autoClose: 3000});
        }
      });
  }

  loadSelect() {
    this.selectOptionNumber = this.selectOption.code;
    this.selectOptionNumber$.next(this.selectOptionNumber);
  }

  private loadItemsAlpha() {
    this.communicatorService.getSelectAplha().subscribe((response:TypeOption[]) => {
        if(response != null){
          this.optionsAlpha = response
        }
    })
  }


  saveTable() {
    this.registers.push({email:this.email, optionNumber: this.selectOption.code, optionAplha:((this.optionsAlpha != null) ? this.optionsAlpha.code : null)})
    this.communicatorService.setTable(this.registers)
  }
}