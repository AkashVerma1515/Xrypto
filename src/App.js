import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Coin from './coin'
import './App.css'
//https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false

function App() {
  const [coin, setCoin] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoin(res.data);
        //console.log(coin);
      }).catch(err => console.log(err))
  }, []);

  const filteredCoins = coin.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="coin-app" id="div_refresh">
      <div className="coin-search">
        <h1 className="coin-text">Search a Currency</h1>
        <form>
          <input type='text'
            placeholder='Search'
            className='coin-input' onChange={e => setSearch(e.target.value)} />
        </form>
      </div>

      {filteredCoins.map(coin => {
        return (<Coin
          key={coin.id}
          name={coin.name}
          image={coin.image}
          symbol={coin.symbol}
          volume={coin.total_volume}
          price={coin.current_price}
          marketcap={coin.market_cap}
          priceChange={coin.price_change_percentage_24h}
        />
        );
      })}
    </div>
  );
}

export default App;
