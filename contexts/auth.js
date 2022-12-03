import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ethers } from 'ethers';

export const Web3AuthContext = React.createContext({
  connect: () => Promise.resolve(null),
  disconnect: () => Promise.resolve(),
  getUserInfo: () => Promise.resolve(),
  loading: false,
  provider: null,
  ethersProvider: null,
  web3Provider: null,
  chainId: '',
  address: '',
  userInfo: null,
  isConnected: false,
});

export const useWeb3AuthContext = () => useContext(Web3AuthContext);

const SignTypeMethod = {
  PERSONAL_SIGN: 'PERSONAL_SIGN',
  EIP712_SIGN: 'EIP712_SIGN',
};

const initialState = {
  provider: null,
  web3Provider: null,
  ethersProvider: null,
  address: '',
  chainId: '0x1',
  isConnected: false,
};

export const Web3AuthProvider = ({ children }) => {
  const biconomy = useRef();
  const [
    { provider, web3Provider, ethersProvider, address, chainId },
    setWeb3State,
  ] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [socialLoginSDK, setSocialLoginSDK] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // if wallet already connected close widget
  useEffect(() => {
    console.log('hidelwallet');
    if (socialLoginSDK && socialLoginSDK.provider) {
      socialLoginSDK.hideWallet();
    }
  }, [address, socialLoginSDK]);

  const connect = useCallback(async () => {
    if (address) return;
    try {
      if (socialLoginSDK?.provider) {
        setLoading(true);
        console.info('socialLoginSDK.provider', socialLoginSDK.provider);
        const web3Provider = new ethers.providers.Web3Provider(
          socialLoginSDK.provider
        );
        const signer = web3Provider.getSigner();
        const gotAccount = await signer.getAddress();
        const network = await web3Provider.getNetwork();
        setWeb3State({
          provider: socialLoginSDK.provider,
          web3Provider: web3Provider,
          ethersProvider: web3Provider,
          address: gotAccount,
          chainId: Number(network.chainId),
        });
        setLoading(false);
        return;
      }
      if (socialLoginSDK) {
        socialLoginSDK.showWallet();
        return socialLoginSDK;
      }
      setLoading(true);
      const sdk = await biconomy.current.getSocialLoginSDK();
      sdk.showConnectModal();
      sdk.showWallet();
      setSocialLoginSDK(sdk);
      setLoading(false);
      return socialLoginSDK;
    } catch {}
  }, [address, socialLoginSDK]);

  const getUserInfo = useCallback(async () => {
    if (socialLoginSDK) {
      const userInfo = await socialLoginSDK.getUserInfo();
      console.log('userInfo', userInfo);
      setUserInfo(userInfo);
    }
  }, [socialLoginSDK]);

  // after metamask login -> get provider event
  useEffect(() => {
    const interval = setInterval(async () => {
      if (address) {
        clearInterval(interval);
      }
      if (socialLoginSDK?.provider && !address) {
        connect();
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [address, connect, socialLoginSDK]);

  useEffect(() => {
    import('@biconomy/web3-auth').then((mod) => {
      biconomy.current = mod;
    });
  }, []);

  const disconnect = useCallback(async () => {
    if (!socialLoginSDK || !socialLoginSDK.web3auth) {
      console.error('Web3Modal not initialized.');
      return;
    }
    await socialLoginSDK.logout();
    setWeb3State({
      provider: null,
      web3Provider: null,
      ethersProvider: null,
      address: '',
      chainId: activeChainId,
    });
    setUserInfo(null);
    window.getSocialLoginSDK = null;
    socialLoginSDK.hideWallet();
    setSocialLoginSDK(null);
  }, [socialLoginSDK]);

  return (
    <Web3AuthContext.Provider
      value={{
        connect,
        disconnect,
        getUserInfo,
        loading,
        provider: provider,
        ethersProvider: ethersProvider || null,
        web3Provider: web3Provider || null,
        chainId: chainId || 0,
        address: address || '',
        userInfo,
        isConnected: !!address,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = () => {
  const context = React.useContext(Web3AuthContext);
  if (!context) {
    throw new Error('useWeb3Auth must be used in a context provider');
  }
  return context;
};
