import {useState, useEffect, useMemo} from "react";
import './App.css';
import * as Web3 from 'web3'
import { OpenSeaPort, Network } from 'opensea-js'

// This example provider won't let you make transactions, only read-only calls:
const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')

const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main
})

function App() {
  const [assets, setAssets] = useState([])
  const [assetIndex, setAssetIndex] = useState(0)
  useEffect(() =>{
    async function fetchAssets() {
    const response = await seaport.api.getAssets({
    // owner: "0x88207b431510dbe0addbdae3bd53013813fc8c71"
  // tokenAddress: "0x06012c8cf97bead5deae237070f9587f8e7a266d",
  // tokenId: 1,
    // collection: "dristys"
    collection: "celebrities-v3-1"
})
    
//     const asset = await seaport.api.getAsset({
//   tokenAddress: "0x06012c8cf97bead5deae237070f9587f8e7a266d",
//   tokenId: 1,
// })
    console.log(response)
    setAssets(response.assets)
}
    fetchAssets()
    }, []) 
  let asset = useMemo(() => assets[assetIndex], [assets, assetIndex]);
  if (assets.length === 0) return null
  return (
    <div className="App">
    <img alt={asset.description} key={asset.tokenId} src={asset.imageUrl} />
    <button onClick={() => setAssetIndex((assetIndex + 1)% assets.length)}>Next</button>
    </div>
  );
}

export default App;
