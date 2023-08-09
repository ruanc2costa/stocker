import React, { useState } from "react";

const StockerHeader = () => {
  const [ticker, setTicker] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(event.target.value);
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const trimmedTicker = ticker.trim();
    if (trimmedTicker) {
      const URL_BASE = "https://stocker.tec.br/ticker.html?";
      window.location.href = `${URL_BASE}${trimmedTicker}`;
    }
  };

  return (
    <header>
      <nav>
        <a className="logo" href="/">
          STOCKER
        </a>
        <div className="mobile-menu">
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <div id="busca">
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              className="textBusca"
              id="searchInput"
              placeholder="Busque uma ação"
              value={ticker}
              onChange={handleInputChange}
            />
            <button type="submit" id="btnBusca">
              <img
                src="./assets/img/pesquisa-de-lupa.png"
                height="20"
                width="20"
                alt="Pesquisar"
              />
            </button>
          </form>
          <ul className="nav-list">
            <li>
              <a href="index.html">Home</a>
            </li>
            <li>
              <a href="sobre.html">Sobre</a>
            </li>
            <li>
              <a href="/">Ajuda</a>
            </li>
            <li>
              <a href="/">Contato</a>
            </li>
          </ul>
        </div>
        {/* Resto do código */}
      </nav>
    </header>
  );
};

export default StockerHeader;
