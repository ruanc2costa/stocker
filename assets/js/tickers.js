// Função para buscar as informações do ticker através da API
async function buscarInformacoesDoTicker(ticker) {
    try {
        const response = await fetch(`https://brapi.dev/api/quote/${ticker}`);
        const data = await response.json();
        return data.results[0];
    } catch (error) {
        console.error("Erro ao buscar informações do ticker:", error);
        return null;
    }
}

// Função para atualizar as informações na página
async function atualizarInformacoes() {
    const ticker = window.location.search.slice(1); // Obtém o ticker da URL (exemplo: ?ticker=PETR4)
    const informacoesDoTicker = await buscarInformacoesDoTicker(ticker);

    if (informacoesDoTicker) {
        document.getElementById("tickerSymbol").textContent = informacoesDoTicker.symbol;
        document.getElementById("tickerPrice").textContent = `R$ ${informacoesDoTicker.regularMarketPrice}`;
        const changePercent = informacoesDoTicker.regularMarketChangePercent.toFixed(2);
        document.getElementById("tickerChange").textContent = `${changePercent}%`;

        // Definir a classe para aplicar a cor de acordo com a variação
        const tickerChangeElement = document.getElementById("tickerChange");
        if (informacoesDoTicker.regularMarketChangePercent < 0) {
            tickerChangeElement.classList.add("negative");
        } else {
            tickerChangeElement.classList.add("positive");
        }
    } else {
        document.getElementById("tickerSymbol").textContent = "Ticker não encontrado ou dados indisponíveis.";
    }
}

// Chamar a função para atualizar as informações inicialmente
atualizarInformacoes();