document.getElementById('connectWallet').addEventListener('click', async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const walletAddress = accounts[0];
        
        document.getElementById('walletAddress').textContent = walletAddress;
        document.getElementById('dashboard').style.display = 'block';
  
        const contractAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';
        const abi = [
          // ... ABI content here ...
        ];
  
        const contract = new web3.eth.Contract(abi, contractAddress);
  
        // Fetch and display traders
        document.getElementById('viewTraders').addEventListener('click', async () => {
          const response = await fetch('http://localhost:5000/api/traders');
          const traders = await response.json();
          const traderList = document.getElementById('traderList');
          traderList.innerHTML = '';
          traders.forEach(trader => {
            const li = document.createElement('li');
            li.textContent = `${trader.name} - Win Rate: ${trader.winRate}%`;
            const followButton = document.createElement('button');
            followButton.textContent = 'Follow';
            followButton.addEventListener('click', async () => {
              await contract.methods.followTrader(trader.walletAddress).send({ from: walletAddress });
              alert(`You are now following ${trader.name}`);
            });
            li.appendChild(followButton);
            traderList.appendChild(li);
          });
          document.getElementById('traders').style.display = 'block';
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  });
  // Example configuration for different networks
const networks = {
    mainnet: {
      chainId: '0x1',
      rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'
    },
    ropsten: {
      chainId: '0x3',
      rpcUrl: 'https://ropsten.infura.io/v3/YOUR_INFURA_PROJECT_ID'
    },
    rinkeby: {
      chainId: '0x4',
      rpcUrl: 'https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID'
    }
  };
  
  // Function to switch network
  async function switchNetwork(networkName) {
    const network = networks[networkName];
    if (!network) return;
  
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: network.chainId }]
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: network.chainId,
              rpcUrl: network.rpcUrl
            }]
          });
        } catch (addError) {
          console.error(addError);
        }
      }
    }
  }
  
  // Example usage: switch to Rinkeby
  document.getElementById('switchToRinkeby').addEventListener('click', () => {
    switchNetwork('rinkeby');
  });
  