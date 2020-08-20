import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Alert, AlertType} from '../../model/alert';
import {AlertService} from '../../../services/alert.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [
    trigger('beginState', [
      transition(':enter', [style({transform: 'translateY(-50%)', opacity: 0}),animate('500ms')]),
      transition(':leave', [animate('300ms', style({transform: 'translateY(-50%)', opacity: 0.5}))])
    ])
  ]
})

export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = false;
  public state:boolean = false

  alerts: Alert[] = [];
  alertSubscription: Subscription;
  routeSubscription: Subscription;

  constructor(private router: Router, private alertService: AlertService) {
  }

  ngOnInit() {
    // subscribe to new alert notifications
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert => {
        // clear alerts when an empty alert is received
        if (!alert.message) {
          // filter out alerts without 'keepAfterRouteChange' flag
          this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

          // remove 'keepAfterRouteChange' flag on the rest
          this.alerts.forEach(x => delete x.keepAfterRouteChange);
          return;
        }

        // add alert to array
        this.alerts.push(alert);
        // auto close alert if required
        this.state = true
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 3000);
        }
      });

    // clear alerts on location change
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    });
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    // check if already removed to prevent error on auto close
    if (!this.alerts.includes(alert)) {
      return;
    }

    if (this.fade) {
      // fade out alert
      this.alerts.find(x => x === alert).fade = true;

      // remove alert after faded out
      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
        this.state = false;
      }, 250);
    } else {
      // remove alert
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    const classes = ['alert', 'alert-dismissable'];

    const alertTypeClass = {
      [AlertType.Success]: 'notification success closeable',
      [AlertType.Error]: 'notification error closeable',
      [AlertType.Info]: 'notification notice closeable',
      [AlertType.Warning]: 'notification warning closeable'
    };

    classes.push(alertTypeClass[alert.type]);
    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }
}
