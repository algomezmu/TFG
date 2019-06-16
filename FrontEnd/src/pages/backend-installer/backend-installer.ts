import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController} from "ionic-angular";
import { Terminal } from 'xterm';
import { fit } from 'xterm/lib/addons/fit/fit';


@Component({
  selector: 'page-backend-installer',
  templateUrl: 'backend-installer.html'
})
export class BackendInstallerPage {

  private term: Terminal;
  // this finds the #terminal element, after view init
  @ViewChild('terminal' ) terminal: ElementRef;

  constructor(public navCtrl:NavController) {
/*
      this.term = new Terminal({
          cursorBlink: true,
          //useStyle: true,
          scrollback: 60,
          rows: 10,
      });

      // this is just simple echo
      this.term.on('key', (key, ev) => {
          console.log(key.charCodeAt(0));
          if (key.charCodeAt(0) == 13)
              this.term.write('\n');
          this.term.write(key);
      });
*/
  }

  // getting the nativeElement only possible after view init
  ngAfterViewInit() {
    }
}
