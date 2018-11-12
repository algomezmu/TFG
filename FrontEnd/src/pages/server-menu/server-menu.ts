import { DiscsPage } from './../server-menu-pages/discs/discsMain';
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { CPUPage } from "../server-menu-pages/cpu/cpuMain";
import { MemoryPage } from "../server-menu-pages/memory/memoryMain";
import { NetworkingPage } from './../server-menu-pages/networking/networkingMain';
import { StatusPage } from "../server-menu-pages/status/status";
import { ConfigPage } from "../server-menu-pages/config/config";
import { EventsListPage } from "../server-menu-pages/events/event-page-1/event-page-1";
import { UsersListPage } from "../server-menu-pages/users/users-page-1/users-page-1";
import { ScriptsListPage } from "../server-menu-pages/scripts/scripts-page-1/scripts-page-1";
import { ShareDataService } from "../../utils/shareData";

@Component({
  selector: 'page-server-menu',
  templateUrl: 'server-menu.html'
})
export class ServerMenuPage {
  // list of trips
  public serverName: any;
  public menuList: any;

  constructor(public nav: NavController, public navParams: NavParams, public shareDataService: ShareDataService) {
    // set sample data
    this.serverName = this.shareDataService.serverName;
    console.log(this.serverName);
    this.createMenuList();
  }

  createMenuList() {
    this.menuList = [
      { first: "Separator", second: "Server Configuration" },
      { first: "Config", second: "Users" },
      { first: "Separator", second: "Server Information" },
      { first: "Status", second: "Internet" },
      { first: "CPU", second: "Memory" },
      { first: "Sockets", second: "Process" },
      { first: "Discs", second: "" },
      { first: "Separator", second: "Server Events & Scripts" },
      { first: "Events", second: "Scritps" }
    ]
  }

  openOption(id) {
    switch (id) {
      case "Status":
        this.nav.push(StatusPage);
        break;
      case "Config":
        this.nav.push(ConfigPage);
        break;
      case "Events":
        this.nav.push(EventsListPage);
        break;
      case "Scritps":
        this.nav.push(ScriptsListPage);
        break;
      case "CPU":
        this.nav.push(CPUPage);
        break;
      case "Memory":
        this.nav.push(MemoryPage);
        break;
      case "Sockets":
        
        break;
      case "Internet":
        this.nav.push(NetworkingPage);
        break;
      case "Process":

        break;
      case "Users":
        this.nav.push(UsersListPage);
        break;
      case "Discs":
        this.nav.push(DiscsPage);
        break;
      default:
        break;
    }
  }
}
