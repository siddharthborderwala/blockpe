import { RouterProtocol } from "@routerprotocol/router-js-sdk";
import { ethers } from "ethers";
import { RPC_URL_MAP } from "~/constants";

const SDK_ID = 24;


export const getRouterProtocolInstance = async (chainId) => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL_MAP[chainId], chainId);
  const routerprotocol = new RouterProtocol(SDK_ID, chainId, provider);
  await routerprotocol.initialize()
  return routerprotocol;
};