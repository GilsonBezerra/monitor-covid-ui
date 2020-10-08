export class Confirmados {
   
    total: string;
    titulo: string;
    novos: number;
    incidencia: string;
    recuperados: string;
    acompanhamento: string;
    percent: string;
}

export class Obitos {

    total: string;
    titulo: string;
    novos: number;
    incidencia: string;
    recuperados: string;
    acompanhamento: string;
    mortalidade: string;
}

export class Dados {
    confirmados: Confirmados;
    obitos: Obitos;

    constructor() {
        this.confirmados = new Confirmados();
        this.obitos = new Obitos();
    }
}
