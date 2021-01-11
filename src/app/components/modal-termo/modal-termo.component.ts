import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-termo',
  templateUrl: './modal-termo.component.html',
  styleUrls: ['./modal-termo.component.scss'],
})
export class ModalTermoComponent implements OnInit {

  public perfil = 'Texto';
  public isToggled;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navParams : NavParams
  ) { 
    // this.message = this.activatedRoute.snapshot.paramMap.get('message');
  }

  ngOnInit() {
    console.log('Resultado dos dados enviados da página para o modal', this.navParams.get('perfil'));
    this.perfil = this.navParams.get('perfil');
  }

  public notify() {
    this.isToggled = !this.isToggled;
  }

}
