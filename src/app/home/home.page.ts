import { Component, OnInit } from '@angular/core';
import { DadosService } from '../dados.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public imgContent = '../../assets/img/background_image.jpg';

  public dados = [];

  constructor( private dadosService: DadosService ) { }
  
  ngOnInit() {
    this.carregarDados();
    console.log(this.dados);
    
  }
  
  // Carrega os dados da API
  public carregarDados() {
    return this.dadosService.buscarDados()
      .subscribe((dados) => {
        this.dados = dados;
      })

  }

  // Atualiza os dados
  public atualizarDados() {
    location.reload();
  }

}
