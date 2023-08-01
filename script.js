const tickerList = document.querySelector(".ticker");

// Função para buscar as cotações dos tickers
async function buscarCotacoes() {
  try {
    const response = await fetch("https://brapi.dev/api/quote/RRRP3,ALSO3,ALPA4,ABEV3,ARZZ3,ASAI3,AZUL4,B3SA3,BBSE3,BBDC3,BBDC4,BRAP4,BBAS3,BRKM5,BRFS3,BPAC11,CRFB3,CCRO3,CMIG4,CIEL3,COGN3,CPLE6,CSAN3,CPFE3,CMIN3,CVCB3,CYRE3,DXCO3,ELET3,ELET6,EMBR3,ENGI11,ENEV3,EGIE3,EQTL3,EZTC3,FLRY3,GGBR4,GOAU4,GOLL4,NTCO3,SOMA3,HAPV3,HYPE3,IGTI11,IRBR3,ITSA4,ITUB4,JBSS3,KLBN11,RENT3,LWSA3,LREN3,MGLU3,MRFG3,CASH3,BEEF3,MRVE3,MULT3,PCAR3,PETR3,PETR4,PRIO3,PETZ3,RADL3,RAIZ4,RDOR3,RAIL3,SBSP3,SANB11,SMTO3,CSNA3,SLCE3,SUZB3,TAEE11,VIVT3,TIMS3,TOTS3,UGPA3,USIM5,VALE3,VIIA3,VBBR3,WEGE3,YDUQ3");
    const data = await response.json();

    // Verificar se os dados da API são um objeto com informações válidas
    if (Array.isArray(data.results) && data.results.length > 0) {
      // Supondo que a API retorna um array de objetos com informações de cada ticker
      const cotacoes = data.results.map((tickerInfo) => {
        const symbol = tickerInfo.symbol;
        const regularMarketPrice = tickerInfo.regularMarketPrice;
        const regularMarketChangePercent = tickerInfo.regularMarketChangePercent;

        // Verificar se o regularMarketChangePercent é negativo ou positivo
        const changeColor = regularMarketChangePercent < 0 ? "red" : "green";

        if (symbol && regularMarketPrice && regularMarketChangePercent !== undefined) {
          return `${symbol}: R$ ${regularMarketPrice} <span style="color: ${changeColor};">${regularMarketChangePercent.toFixed(2)}%</span>`;
        } else {
          return `Dados indisponíveis para um ticker`;
        }
      });

      // Atualizar a lista de cotações na tela
      tickerList.innerHTML = ""; // Limpar a lista antes de atualizar as cotações
      
      cotacoes.forEach((cotacao) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = cotacao; // Usamos innerHTML para interpretar a formatação de cores
        tickerList.appendChild(listItem);
      });
    } else {
      // Caso a API não retorne um array válido
      console.error("Dados inválidos retornados pela API.");
    }
  } catch (error) {
    console.error("Erro ao buscar cotações:", error);
  }
}

// Função para buscar as cotações inicialmente
buscarCotacoes();
setInterval(buscarCotacoes, 900000); // Atualizar as cotações a cada 15 minutos (15 minutos = 900000 milissegundos)

function redirecionarParaPesquisa() {
  const ticker = document.getElementById("searchInput").value.trim();
  if (ticker) {
      // Substitua a URL_BASE pelo caminho da página onde você deseja redirecionar
      const URL_BASE = "https://stocker.tec.br/ticker=";
      window.location.href = `${URL_BASE}${ticker}`;
  }
  return false; // Evita o envio padrão do formulário
}