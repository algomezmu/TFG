import { Component } from "@angular/core";
import { NavController} from "ionic-angular";

@Component({
  selector: 'page-backend-installer',
  templateUrl: 'backend-installer.html'
})
export class BackendInstallerPage {
  // list of trips
  public serverList: any;

  constructor(public nav: NavController) {
    // set sample data
    //this.trips = tripService.getAll();
  }
}
