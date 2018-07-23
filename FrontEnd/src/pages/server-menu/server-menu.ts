import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { CPUPage } from "../server-menu-pages/cpu/cpuMain";
import { MemoryPage } from "../server-menu-pages/memory/memoryMain";
import { StatusPage } from "../server-menu-pages/status/status";
import { ConfigPage } from "../server-menu-pages/config/config";
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
      { first: "Status", second: "Config" },
      { first: "Events", second: "Scritps" },
      { first: "CPU", second: "Memory" },
      { first: "Sockets", second: "Internet" },
      { first: "Process", second: "Users" },
      { first: "Discs" },
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

        break;
      case "Scritps":

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

        break;
      case "Process":

        break;
        case "Users":

        break;
        case "Discs":

        break;
      default:
        break;
    }
  }
}
