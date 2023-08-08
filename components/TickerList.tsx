import React, { useEffect, useState } from 'react';
// Restante do código do componente TickerList


function TickerList(): React.JSX.Element {
  const [cotacoes, setCotacoes] = useState([]);

  const buscarCotacoes = async () => {
    try {
      const response = await fetch(
        "https://brapi.dev/api/quote/RRRP3,ALSO3,ALPA4,ABEV3,ARZZ3,ASAI3,AZUL4,B3SA3,BBSE3,BBDC3,BBDC4,BRAP4,BBAS3,BRKM5,BRFS3,BPAC11,CRFB3,CCRO3,CMIG4,CIEL3,COGN3,CPLE6,CSAN3,CPFE3,CMIN3,CVCB3,CYRE3,DXCO3,ELET3,ELET6,EMBR3,ENGI11,ENEV3,EGIE3,EQTL3,EZTC3,FLRY3,GGBR4,GOAU4,GOLL4,NTCO3,SOMA3,HAPV3,HYPE3,IGTI11,IRBR3,ITSA4,ITUB4,JBSS3,KLBN11,RENT3,LWSA3,LREN3,MGLU3,MRFG3,CASH3,BEEF3,MRVE3,MULT3,PCAR3,PETR3,PETR4,PRIO3,PETZ3,RADL3,RAIZ4,RDOR3,RAIL3,SBSP3,SANB11,SMTO3,CSNA3,SLCE3,SUZB3,TAEE11,VIVT3,TIMS3,TOTS3,UGPA3,USIM5,VALE3,VIIA3,VBBR3,WEGE3,YDUQ3"
      );
      const data = await response.json();

      if (Array.isArray(data.results) && data.results.length > 0) {
        const cotacoes = data.results.map((tickerInfo: { symbol: string; regularMarketPrice: number; regularMarketChangePercent: number; }) => {
          const symbol = tickerInfo.symbol;
          const regularMarketPrice = tickerInfo.regularMarketPrice;
          const regularMarketChangePercent = tickerInfo.regularMarketChangePercent;

          const changeColor = regularMarketChangePercent < 0 ? "red" : "green";

          if (symbol && regularMarketPrice !== null && regularMarketChangePercent !== null) {
            return `${symbol}: R$ ${regularMarketPrice.toFixed(2)} <span style="color: ${changeColor};">${regularMarketChangePercent.toFixed(2)}%</span>`;
          } else {
            return `Dados indisponíveis para um ticker`;
          }
        });

        setCotacoes(cotacoes);
      } else {
        console.error("Dados inválidos retornados pela API.");
      }
    } catch (error) {
      console.error("Erro ao buscar cotações:", error);
    }
  };

  useEffect(() => {
    buscarCotacoes();

    const intervalId = setInterval(buscarCotacoes, 900000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="ticker-container">
      <ul className="ticker">
        {cotacoes.map((cotacao, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: cotacao }} />
        ))}
      </ul>
    </div>
  );
}

export default TickerList;
