import { Component } from '@angular/core';
import { CpuActualPage } from './cpuTab1/cpuActual';
import { CpuHistoryPage } from './cpuTab2/cpuHistory';
  
@Component({
  template: `
    <ion-header>
      <ion-navbar color="primary">
        <!--
        <button ion-button menuToggle>
          <ion-icon name="menu"></ion-icon>
        </button>-->
        <ion-title>
          <strong>CPU Info</strong>
        </ion-title>
        <ion-buttons end>
          <button ion-button tappable (click)="presentNotifications($event)">
            <ion-icon name="notifications"></ion-icon>
          </button>
          <button ion-button tappable (click)="goToAccount()">
            <ion-icon name="cog"></ion-icon>
          </button>
        </ion-buttons>
      </ion-navbar>
    </ion-header>
    <ion-tabs>
      <ion-tab tabIcon="play" [root]="tab1"></ion-tab>
      <ion-tab tabIcon="clock" [root]="tab2"></ion-tab>
    </ion-tabs>`
})
export class CPUPage {

  tab1: any;
  tab2: any;

  constructor() {
    this.tab1 = CpuActualPage;
    this.tab2 = CpuHistoryPage;
  }
}