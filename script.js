const tela = document.getElementById("tela");
let valorAtual = "";
let valorAnterior = "";
let operador = null;

// Atualiza o display com valor anterior + operador + valor atual
function atualizarTela() {
  if (operador && valorAnterior !== "" && valorAtual === "") {
    tela.innerHTML = `${valorAnterior} ${operador}`;
  } else if (operador && valorAnterior !== "" && valorAtual !== "") {
    tela.innerHTML = `${valorAnterior} ${operador} ${valorAtual}`;
  } else {
    tela.innerHTML = valorAtual || "0";
  }
}

// Botões numéricos e ponto
document.querySelectorAll("[data-num]").forEach(botao => {
  botao.addEventListener("click", () => {
    const numero = botao.getAttribute("data-num");

    if (numero === "." && valorAtual.includes(".")) return;

    valorAtual += numero;
    atualizarTela();
  });
});

// Botões de operação
document.querySelectorAll("[data-op]").forEach(botao => {
  const op = botao.getAttribute("data-op");

  botao.addEventListener("click", () => {
    if (op === "Ac") {
      // Limpa tudo
      valorAtual = "";
      valorAnterior = "";
      operador = null;
      atualizarTela();
    } else if (op === "del") {
      
      // Remove último dígito
      valorAtual = valorAtual.slice(0, -1);
      atualizarTela();
    } else if (op === "=") {
      if (valorAnterior && operador && valorAtual) {
        const n1 = parseFloat(valorAnterior);
        const n2 = parseFloat(valorAtual);
        let resultado;

        switch (operador) {
          case "+":
            resultado = n1 + n2;
            break;
          case "-":
            resultado = n1 - n2;
            break;
          case "*":
            resultado = n1 * n2;
            break;
          case "/":
            resultado = n2 !== 0 ? n1 / n2 : "Erro";
            break;
        }

        valorAtual = resultado.toString();
        valorAnterior = "";
        operador = null;
        atualizarTela();
      }
    } else {
      // Se já existe operação pendente, resolve antes
      if (valorAnterior && operador && valorAtual) {
        document.querySelector("[data-op='=']").click();
      }

      operador = op;
      valorAnterior = valorAtual;
      valorAtual = "";
      atualizarTela();
    }
  });
});

// Inicializa
atualizarTela();
