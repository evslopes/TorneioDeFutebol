// Elvis Lopes TP1 JavaScript

let Times = ["Flamengo", "Fluminense", "Vasco", "Botafogo"]
let Pontos = [0, 0, 0, 0]
let GolsMarcados = [0, 0, 0, 0]
let SaldoDeGols = [0, 0, 0, 0]
let GolsSofridos = [0, 0, 0, 0]


function placarAleatorio(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function simularPartida(TimeCasa, TimeVisitante) {
    NomeTimeCasa = Times[TimeCasa]
    NomeTimeVisitante = Times[TimeVisitante]

    GolsTimeCasa = placarAleatorio(0, 5);
    GolsTimeVisitante = placarAleatorio(0, 5);
    atualizarSaldos(TimeCasa, TimeVisitante, GolsTimeCasa, GolsTimeVisitante)
    atualizarPontos(TimeCasa, TimeVisitante, GolsTimeCasa, GolsTimeVisitante)


    let resultado = `${NomeTimeCasa}: ${GolsTimeCasa} X ${GolsTimeVisitante} ${NomeTimeVisitante}.`;

    console.log(resultado);
}

function executaRodadas() {
    // Rodadas IDA
    let max = 3;
    console.log('\nTurno de ida')
    for (let i = 0; i < max; i++) {
        console.log(`\nRodada ${i + 1}:`);

        let verificaTime2 = i + 1 >= max ? i - 2 : i + 1
        let verificaTime3 = i + 2 >= max ? i - 1 : i + 2

        simularPartida(i, verificaTime2);
        simularPartida(verificaTime3, 3)

    }

    // Rodadas Volta
    console.log("\nTurno de volta")
    for (let i = 0; i < max; i++) {
        console.log(`\nRodada ${i + 4}:`);

        let verificaTime2 = i + 2 >= max ? i - 1 : i + 2
        let verificaTime3 = i + 1 >= max ? i - 2 : i + 1

        simularPartida(verificaTime3, i);
        simularPartida(3, verificaTime2);

    }

}

function atualizarPontos(TimeCasa, TimeVisitante, GolsTimeCasa, GolsTimeVisitante) {
    if (GolsTimeCasa > GolsTimeVisitante) {
        Pontos[TimeCasa] += 3;
        return
    }
    if (GolsTimeCasa < GolsTimeVisitante) {
        Pontos[TimeVisitante] += 3;
        return
    }

    Pontos[TimeCasa]++;
    Pontos[TimeVisitante]++

}

function atualizarSaldos(TimeCasa, TimeVisitante, GolsTimeCasa, GolsTimeVisitante) {
    GolsMarcados[TimeCasa] += GolsTimeCasa
    GolsMarcados[TimeVisitante] += GolsTimeVisitante
    GolsSofridos[TimeCasa] += GolsTimeVisitante
    GolsSofridos[TimeVisitante] += GolsTimeCasa
    SaldoDeGols[TimeCasa] = GolsMarcados[TimeCasa] - GolsSofridos[TimeCasa]
    SaldoDeGols[TimeVisitante] = GolsMarcados[TimeVisitante] - GolsSofridos[TimeVisitante]
}

function classificacao() {

    let classificacao = []
    let posicaoMaior = 0
    let pontosMaior = 0
    let posicaoSegundo = 0
    let pontosSegundo = 0
    let posicaoTerceiro = 0
    let pontosTerceiro = 0
    let posicaoQuarto = 0
    let pontosQuarto = 0

    //Localizando o primeiro
    for (let i = 0; i <= 3; i++) {
        if (Pontos[i] > pontosMaior) {
            pontosMaior = Pontos[i]
            posicaoMaior = i
        }
    }

    //Localizando o segundo
    for (let i = 0; i <= 3; i++) {
        if ((Pontos[i] > pontosSegundo) && (pontosSegundo < pontosMaior) && (Pontos[i] < pontosMaior)) {
            pontosSegundo = Pontos[i]
            posicaoSegundo = i
        }
    }

    //Localizando o terceiro
    for (let i = 0; i <= 3; i++) {
        if ((Pontos[i] > pontosTerceiro) && (pontosTerceiro < pontosSegundo) && (Pontos[i] < pontosSegundo)) {
            pontosTerceiro = Pontos[i]
            posicaoTerceiro = i
        }
    }

    //Localizando o quarto
    for (let i = 0; i <= 3; i++) {
        if ((Pontos[i] > pontosQuarto) && (pontosQuarto < pontosTerceiro) && (Pontos[i] < pontosTerceiro)) {
            pontosQuarto = Pontos[i]
            posicaoQuarto = i
        }
    }

    let auxiliar = 0

    function ajuste(i) {
        auxiliar = classificacao[i]
        classificacao[i] = classificacao[i + 1]
        classificacao[i + 1] = classificacao[auxiliar]
    }


    for (let i = 0; i < 2; i++) {

        let empateDePontos = Pontos[classificacao[i]] === Pontos[classificacao[i + 1]]
        let empateGolsMarcados = GolsMarcados[classificacao[i]] === GolsMarcados[classificacao[i + 1]]
        let empateSaldoDeGols = SaldoDeGols[classificacao[i]] === SaldoDeGols[classificacao[i + 1]]
        let desempateGolsMarcados = GolsMarcados[classificacao[i]] < GolsMarcados[classificacao[i + 1]]
        let desempateSaldoDeGols = SaldoDeGols[classificacao[i]] < SaldoDeGols[classificacao[i + 1]]
        let desempateGolsSofridos = GolsSofridos[classificacao[i]] < GolsSofridos[classificacao[i + 1]]

        if(empateDePontos){
            if(desempateGolsMarcados){
                ajuste()
                break
            }
            if(desempateSaldoDeGols){
                ajuste()
                break
            }
            if (desempateGolsSofridos){
                ajuste()
                break
            }

        }

    }

    classificacao = [posicaoMaior, posicaoSegundo, posicaoTerceiro, posicaoQuarto]

    console.log(`\nClassificação`)
    console.log(`1º Lugar: ${Times[posicaoMaior]} com ${Pontos[posicaoMaior]} pontos`)
    console.log(`2º Lugar: ${Times[posicaoSegundo]} com ${Pontos[posicaoSegundo]} pontos`)
    console.log(`3º Lugar: ${Times[posicaoTerceiro]} com ${Pontos[posicaoTerceiro]} pontos`)
    console.log(`4º Lugar: ${Times[posicaoQuarto]} com ${Pontos[posicaoQuarto]} pontos`)

    return classificacao
}

function atualizarTabela() {

    let tabela = {
        "Times": Times,
        "Pontos": Pontos,
        "GolsMarcados": GolsMarcados,
        "SaldoDeGols": SaldoDeGols,
        "GolsSofridos": GolsSofridos
    };

    console.log("\nTabela:")
    // let cabecalho = `|  Times  |   Pontos   |   GolsMarcados   |   SaldoDeGols   |   GolsSofridos   |`
    // console.log(cabecalho)
    //
    // for (let i = 0; i <= 3; i++) {
    //     let linhas = `|   ${tabela.Times[i]}   |   ${tabela.Pontos[i]}   |   ${tabela.GolsMarcados[i]}   |   ${tabela.SaldoDeGols[i]}   |   ${tabela.GolsSofridos[i]}   |`
    //     console.log(linhas)
    // }
    console.table(tabela)
}

function simularPenaltis(TimeCasa, TimeVisitante) {
    PenaltisTimeCasa = placarAleatorio(0, 5);
    PenaltisTimeVisitante = placarAleatorio(0, 5);
    let resultadoPenaltais = `Penaltis: ${NomeTimeCasa}: ${PenaltisTimeCasa} X ${PenaltisTimeVisitante} ${NomeTimeVisitante}.`;

    console.log(resultadoPenaltais)

    if (PenaltisTimeCasa === PenaltisTimeVisitante) {
        simularPenaltis(TimeCasa, TimeVisitante)
    } else {

        if (PenaltisTimeCasa > PenaltisTimeVisitante) {
            console.log(`Time campeão: ${NomeTimeCasa}`)
        }
        if (PenaltisTimeVisitante > PenaltisTimeCasa) {
            console.log(`Time campeão: ${NomeTimeVisitante}`)
        }
    }
}

function simularPartidaFinal(TimeCasa, TimeVisitante) {
    NomeTimeCasa = Times[TimeCasa]
    NomeTimeVisitante = Times[TimeVisitante]

    GolsTimeCasa = placarAleatorio(0, 5);
    GolsTimeVisitante = placarAleatorio(0, 5);

    let resultado = `\nFinal: ${NomeTimeCasa}: ${GolsTimeCasa} X ${GolsTimeVisitante} ${NomeTimeVisitante}.`;
    console.log(resultado);

    if (GolsTimeCasa > GolsTimeVisitante) {
        console.log(`Time campeão: ${NomeTimeCasa}`)
    }
    if (GolsTimeCasa < GolsTimeVisitante) {
        console.log(`Time campeão: ${NomeTimeVisitante}`)
    }

    if (GolsTimeCasa === GolsTimeVisitante) {
        simularPenaltis(TimeCasa, TimeVisitante)
    }
}

function executarFinal() {
    let final = classificacao()
    simularPartidaFinal(final[0], final[1])

}

//main
executaRodadas()
atualizarTabela()
executarFinal()
