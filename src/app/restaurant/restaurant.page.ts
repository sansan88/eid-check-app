import {
  Platform,
  NavController
} from '@ionic/angular';
import {
  ApiService
} from './../api.service';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  AlertController
} from '@ionic/angular';

import {
  Router,
  ActivatedRoute
} from '@angular/router';


//Capacitor
import {
  Plugins
} from '@capacitor/core';
const {
  Browser,
  Storage

} = Plugins;
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {
  public data: any;
  public check: any;
  constructor(
    public router: Router,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private api: ApiService,
    private plt: Platform) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {


        this.data = this.router.getCurrentNavigation().extras.state.eIDData;
        this.check = this.router.getCurrentNavigation().extras.state.check;



      }
    });

  }


  ngOnInit() {}

  checkIdentity(claims) {
    var isWeb = true;
    if (this.plt.is("cordova")) {
      isWeb = false;
    }
    this.api.geteIDAuthorizationURL(isWeb, claims.toString()).subscribe(data => {

      //console.log("received token: " + data["token"]);

      if (isWeb) {
        this.openBrowser(data["url"]);
        //this.presentModalQRCode(data["url"], "QR-Code mit eID scannen");
      } else {
        this.openBrowser(data["url"]);
      }

    }, error => {
      console.error(JSON.stringify(error));
    });

  }

  async openBrowser(url) {

    await Browser.open({
      url: url,
      //presentationStyle: "popover",
      windowName: "_self"
    }).catch(rejected => {
      alert(JSON.stringify(rejected));
    });

  }

  getData() {
    this.setObject("check", {
      "checkType": "restaurant",
      "claims": ["birth_date", "picture"]
    });
    this.checkIdentity(["given_name", "family_name", "phone"]);
  }
  // JSON "set" example
  async setObject(key, object) {
    await Storage.set({
      key: key,
      value: JSON.stringify(object)
    });
  }

  // JSON "get" example
  async getObject(key) {
    const ret = await Storage.get({
      key: key
    });
    const data = JSON.parse(ret.value);
    return data;
  }

  async clear() {
    await Storage.clear();
  }


}