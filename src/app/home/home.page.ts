import { Component, OnInit } from '@angular/core';
import { DadosService } from '../dados.service';
import { Dados } from './dados.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

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

  constructor( private dadosService: DadosService ) { }
  
  ngOnInit() {
    this.carregarDados();
    console.log(this.dados);
    
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

  // Atualiza os dados
  public atualizarDados() {
    location.reload();
  }

}
