const fetchTopCryptoData = async () => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10');
        if (!response.ok) {
            throw new Error('Failed to fetch top crypto data');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching top crypto data:', error);
        return [];
    }
};

const populateTickerWithRealData = async () => {
    try {
        const topCryptoData = await fetchTopCryptoData();

        console.log('Top Crypto Data:', topCryptoData);

        const ticker = document.getElementById('ticker');
        ticker.innerHTML = '';

        const itemWidth = 300; // Largura estimada de cada item
        const spacing = 50; // Espaço desejado entre os itens

        const combinedData = [...topCryptoData, ...topCryptoData]; // Duplicando os dados para criar um loop

        combinedData.forEach(coin => {
            const tickerItem = document.createElement('div');
            tickerItem.className = 'ticker__item';

            const text = document.createElement('span');
            text.textContent = `${coin.symbol.toUpperCase()} ${coin.price_change_percentage_24h.toFixed(2)}%`;
            tickerItem.appendChild(text);

            const icon = document.createElement('img');
            icon.src = coin.price_change_percentage_24h > 0 ? 'verde.png' : 'vermelho.png';
            icon.alt = coin.price_change_percentage_24h > 0 ? 'Seta para cima verde' : 'Seta para baixo vermelha';
            icon.className = 'arrow-icon'; // Adiciona classe para estilização
            tickerItem.appendChild(icon);

            ticker.appendChild(tickerItem);
        });

        const totalWidth = (combinedData.length * itemWidth) + ((combinedData.length - 1) * spacing); // Calculando a largura total do ticker
        ticker.style.width = `${totalWidth}px`; // Definindo a largura do ticker
    } catch (error) {
        console.error('Error populating ticker with real data:', error);
    }
};

// Call the function to populate ticker with real data
populateTickerWithRealData();
