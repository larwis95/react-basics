import './App.css'
//import SearchBox from './components/SearchBox'
import CryptoInfo from './components/CryptoInfo'

function App() {
  return (
    <>
      <h1>Welcome to crypto-prices!</h1>
      <p>
        You'll be able to search cryptocurrencies and learn more about them! <br/>
        *Results current as of 60 seconds ago
      </p>
      <CryptoInfo />
    </>
  )
}

export default App
