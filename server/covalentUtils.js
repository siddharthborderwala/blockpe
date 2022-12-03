import axios from "axios";
import { COVALENT_BASE_URL, identifierToChainNameMap } from "../constants";

const API_KEY = 'ckey_346a864b0b0c407e800381e94b9';

export function covalentURLMaker(endpoint, chainId) {
  return `${COVALENT_BASE_URL}/${chainId}/${endpoint}/?key=${API_KEY}`;
}

export async function getActivityByChainId(address, chainId) {
  const url = covalentURLMaker(`address/${address}/transactions_v2`, chainId);
  const response = await axios.get(url);
  return response.data;
}

export async function getActivityForAllChains(address, chainIds) {
  const activities = await Promise.all(chainIds.map(async (chainId) => {
    const activity = await getActivityByChainId(address, chainId);
    return activity;``
  }))
  return activities.flat();
}