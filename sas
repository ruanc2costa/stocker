<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="/styles/style.css" media="screen" />

    <title>Stocker</title>
</head>
    <header>
        <nav>
            <a class="logo" href="/">STOCKER</a>
            <div class="mobile-menu">
                <div class="line1"></div>
                <div class="line2"></div>
                <div class="line3"></div>
            </div>
            <div id="busca">
                <input type="text" class="textBusca"  id="searchInput" placeholder="Busque uma ação">
                <button type="button" id="btnBusca" onclick= "redirecionarParaPesquisa()"> <img src="./assets/pesquisa-de-lupa.png" height="20" width="20" /></button>
            </div>
            <ul class="nav-list">
                <li><a href="index.html">Home</a></li>
                <li><a href="sobre.html">Sobre</a></li>
                <li><a href="/">Ajuda</a></li>
                <li><a href="/">Contato</a></li>
                <li><div class="mobileBusca">
                    <a><input type="text" class="textBusca" placeholder="Busque uma ação">
                    <img src="./assets/pesquisa-de-lupa.png" id="btnBusca"/></a>
                </div></li>
            </ul>
        </nav>
    </header>
    <body>
        <div class="main-container">
        <div class="menu-container">
        </div>
        <div class="ticker-container">
            <ul class="ticker">
            </ul>
        </div>
        </div>
        <h1 id="tickerSymbol"></h1>
    <p id="tickerPrice"></p>
    <p id="tickerChange"></p>

    <script>
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
                document.getElementById("tickerPrice").textContent = `Preço: R$ ${informacoesDoTicker.regularMarketPrice}`;
                const changePercent = informacoesDoTicker.regularMarketChangePercent.toFixed(2);
                document.getElementById("tickerChange").textContent = `Variação: ${changePercent}%`;

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
    </script>
        <script src="script.js"></script>
        <script src="mobile-navbar.js"></script>
    </body>
    
</html>