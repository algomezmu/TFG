import { Component } from "@angular/core";
import { NavController, NavParams  } from "ionic-angular";

@Component({
  selector: 'page-server-menu',
  templateUrl: 'server-menu.html'
})
export class ServerMenuPage {
  // list of trips
  public serverId: any;
  public menuList: any;

  constructor(public nav: NavController, public navParams: NavParams) {
    // set sample data
    console.log("Aqui");
    this.serverId = navParams.get('id'); 
    console.log("fin");
    this.createMenuList();
  }

  createMenuList(){
    this.menuList = [
      {first: "Status", second:"Config"},
      {first: "Events", second:"Scritps"},
      {first: "CPU", second:"Memory"},
      {first: "Sockets", second:"Internet"},
      {first: "Process", second:"Users"},
      {first: "Discs"},
    ]
  }

  // view trip detail
  viewDetail(id) {
    console.log(id);
    //this.nav.push(TripDetailPage, { id: id });
  }
}
