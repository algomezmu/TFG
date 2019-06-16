import { Component } from '@angular/core';
import { NetworkingActualPage } from './networkingTab1/networkingActual';
import { NetworkingHistoryPage } from './networkingTab2/networkingHistory';
  
@Component({
  template: `
    <ion-header>
      <ion-navbar color="primary">
        <!--
        <button ion-button menuToggle>
          <ion-icon name="menu"></ion-icon>
        </button>-->
        <ion-title>
          <strong>Networking Info</strong>
        </ion-title>
        <!--
        <ion-buttons end>
          <button ion-button tappable (click)="presentNotifications($event)">
            <ion-icon name="notifications"></ion-icon>
          </button>
          <button ion-button tappable (click)="goToAccount()">
            <ion-icon name="cog"></ion-icon>
          </button>
        </ion-buttons>
          -->
      </ion-navbar>
    </ion-header>
    <ion-tabs>
      <ion-tab tabIcon="play" [root]="tab1"></ion-tab>
      <ion-tab tabIcon="clock" [root]="tab2"></ion-tab>
    </ion-tabs>`
})
export class NetworkingPage {

  tab1: any;
  tab2: any;

  constructor() {
    this.tab1 = NetworkingActualPage;
    this.tab2 = NetworkingHistoryPage;
  }
}