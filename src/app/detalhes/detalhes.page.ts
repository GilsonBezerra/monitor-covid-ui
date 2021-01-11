import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, NavParams, Platform, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {

  public sub: any;

  public confirmados;
  public novos;
  public incidencia;
  public acompanhamento;
  public recuperados;
  public totalObitos;
  public em24hs;
  public mortalidade;
  public dado;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public router: Router,
    public activatedRoute : ActivatedRoute,
    private platform: Platform,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController

  ) {
    this.dado = this.activatedRoute.snapshot.paramMap.get('dado');
    
  }
  
  ngOnInit() {
    this.sub = this.platform.backButton.subscribeWithPriority(9999, () => {
      this.presentAlertButton(); this.sub.unsubscribe();
    });

    console.log(`Resultado dos dados ${this.dado}`);
    
  }

  ionViewDidEnter(){
    this.showLoadingSpinner();
  }

  public async presentAlertButton() {
    this.sub = this.platform.backButton.subscribeWithPriority(9999, () => { });
    const alert = await this.alertCtrl.create({
      header: 'Atenção',
      message: `
      <hr>
      <p>
      Deseja voltar para a tela inicial?
      </p>
      <hr>
      `,
      backdropDismiss: false,
      cssClass: 'alert-button-style',
      buttons: [{
        text: 'Cancelar', role: 'cancel', handler: () => {
          this.alertCtrl.dismiss();
          this.sub.unsubscribe();
        }
      },
        {
          text: 'Voltar', handler: () => {
            this.navCtrl.navigateBack('/home');
            this.sub.unsubscribe();
          }
      }]
    });
    return alert.present();
  }

  async showLoadingSpinner() {
    let spinner = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Processando...',
      duration: 1000
    });
    return await spinner.present();
  }


}
