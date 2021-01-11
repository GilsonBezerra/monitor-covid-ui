import { DetalhesPage } from './../detalhes/detalhes.page';
import { Component, OnInit } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { DadosService } from '../dados.service';
import { Dados } from './dados.model';
import { Router } from '@angular/router';
import { ModalTermoComponent } from '../components/modal-termo/modal-termo.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public imgContent = '../../assets/img/background_image.jpg';

  public dados: Dados;

  public confirmados;
  public novos;
  public incidencia;
  public acompanhamento;
  public recuperados;
  public totalObitos;
  public em24hs;
  public mortalidade;
  public sub: any;

  public perfil = 1;

  constructor(
    private dadosService : DadosService,
    public router : Router,
    public navCtrl : NavController,
    private platform : Platform,
    private alertCtrl : AlertController,
    private modalCtrl : ModalController
  ) { }

  ngOnInit() {
    this.carregarDados();
    console.log(this.dados);
    this.sub = this.platform.backButton.subscribeWithPriority(9999, () => {
    });

  }

  // Carrega os dados da API
  public carregarDados() {
    return this.dadosService.buscarDados()
      .subscribe((dados: any) => {
        this.dados = dados;
        this.confirmados = Number(this.dados.confirmados.total).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.novos = this.dados.confirmados.novos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.incidencia = parseFloat(this.dados.confirmados.incidencia).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.acompanhamento = Number(this.dados.confirmados.acompanhamento).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.recuperados = Number(this.dados.confirmados.recuperados).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.totalObitos = Number(this.dados.obitos.total).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.em24hs = Number(this.dados.obitos.novos).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.mortalidade = this.dados.obitos.mortalidade;

      })

  }

  public pushPage(dado: string) {
    this.navCtrl.navigateForward(['/detalhes', {
      dado: dado
    }]);
  }


public async openModalTermos() {
    const modal = await this.modalCtrl.create({
      component: ModalTermoComponent,
      componentProps: {
        perfil: this.perfil
      }
    })
    modal.present();
  }


  // Atualiza os dados
  public atualizarDados() {
    location.reload();
  }
  public closeApp() {
    navigator['app'].exitApp();
  }

  public async alertCloseApp() {
    const alert = await this.alertCtrl.create({
      header: 'Atenção',
      message:
        `
        <hr>
          <p>
              Deseja sair do aplicativo?
          </p>
        <hr>
        `,
      buttons: [{
        text: 'Cancelar', role: 'cancel', handler: () => {
          this.alertCtrl.dismiss();
          this.sub.unsubscribe();
        }
      },
      {
        text: 'Sair', handler: () => {
          this.closeApp();
          this.sub.unsubscribe();
        }
      }]
    });
    return alert.present();
  }


}
