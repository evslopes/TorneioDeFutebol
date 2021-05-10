// Algoritmo 01 Contar e imprimir quantos números existem entre 0 e 1.000.000 (exclusives*)
// que sejam múltiplos de 2 e 3 simultaneamente
// * exclusives - Ou seja, quantos números existem entre 0 e 1.000.000, excluindo o 1 e o 1.000.000

let count = 0;
for (let i = 1; i < 1000000; i += 1) {
    if (i % 2 === 0 && i % 3 === 0) {
        count++;
    }
}
console.log(count)

// Algoritmo 02 Calcular o fatorial de 53, imprimido o resultado e o tempo necessário para a execução.
// (Dica: usar o objeto javascript Date)
// O resultado deve ser mostrado no formato 53! = XXXXXX (yyy milisegundos)

let fat = 1;
for (let x = 1; x <= 53; x++) {
    fat = fat * x;
}
console.log("53" + "! = " + fat + " yyy milisegundos");


function fatorial(n){
    if ((n == 0) || (n == 1))
        return 1;
    else
        return (n * fatorial(n - 1));
}

fatorial(53)

// Exercicio Aula - Elvis
for (let i = 5; i <= 25; i += 3) {
    if (i % 2 === 0 ) {
        console.log(i);
    }
}

// Exercicio Aula - Elvis
for (let i = 90; i >= 23; i--) {
    // if (i % 2 === 0 ) {
    console.log(i);
    // }
}