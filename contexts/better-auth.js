import React, { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { ChainId } from '@biconomy/core-types';
import { useActiveAddress } from '~/atoms/active-address';
import { useActiveNetwork } from '~/atoms/active-network';

export const BetterAuthContext = React.createContext({
  connect: () => Promise.resolve(null),
  disconnect: () => Promise.resolve(),
  fetchUserInfo: () => Promise.resolve(),
  isLoading: false,
  provider: null,
  account: undefined,
  isConnected: false,
});

export const BetterAuthProvider = ({ children }) => {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoginSDK, setSocialLoginSDK] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [activeAddress, setActiveAddress] = useActiveAddress();
  const [activeNetwork] = useActiveNetwork();

  const connect = useCallback(async () => {
    if (typeof window === 'undefined') return;
    setIsLoading(true);
    if (socialLoginSDK?.provider) {
      const web3Provider = new ethers.providers.Web3Provider(
        socialLoginSDK.provider
      );
      setProvider(web3Provider);
      const accounts = await web3Provider.listAccounts();
      setAccount(accounts[0]);
      return;
    }
    if (socialLoginSDK) {
      socialLoginSDK.showWallet();
      return socialLoginSDK;
    }
    const sdk = (await import('@biconomy/web3-auth')).socialLoginSDK;
    await sdk.init(ethers.utils.hexValue(activeNetwork));
    setSocialLoginSDK(sdk);
    sdk.showConnectModal();
    sdk.showWallet();
    setIsLoading(false);
    return socialLoginSDK;
  }, [activeNetwork, socialLoginSDK]);

  const fetchUserInfo = useCallback(async () => {
    if (socialLoginSDK) {
      const userInfo = await socialLoginSDK.getUserInfo();
      setUserInfo(userInfo);
      return userInfo;
    }
  }, [socialLoginSDK]);

  useEffect(() => {
    if (socialLoginSDK && socialLoginSDK.provider) {
      socialLoginSDK.hideWallet();
    }
  }, [account, socialLoginSDK]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (account) {
        clearInterval(interval);
      }
      if (socialLoginSDK?.provider && !account) {
        connect();
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [account, connect, socialLoginSDK]);

  const disconnect = async () => {
    if (!socialLoginSDK || !socialLoginSDK.web3auth) {
      console.error('Web3Modal not initialized.');
      return;
    }
    await socialLoginSDK.logout();
    socialLoginSDK.hideWallet();
    setProvider(undefined);
    setAccount(undefined);
  };

  useEffect(() => {
    if (!account && activeAddress) {
      connect();
    }
  }, [account, activeAddress, connect]);

  return (
    <BetterAuthContext.Provider
      value={{
        connect,
        disconnect,
        fetchUserInfo,
        isLoading,
        provider,
        account,
        userInfo,
        isConnected: !!account,
      }}
    >
      {children}
    </BetterAuthContext.Provider>
  );
};

export const useBetterAuth = () => {
  const context = React.useContext(BetterAuthContext);
  if (!context) {
    throw new Error('useBetterAuth must be used in a context provider');
  }
  return context;
};
