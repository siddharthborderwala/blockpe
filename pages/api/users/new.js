import { addUser, createLink, getUserByWalletAddress } from '../../../server/firebaseUtils';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      name,
      description,
      preferred_token_address,
      preferred_chain_id,
      wallet_address,
      logoUrl
    } = req.body.data;
    try {
      const userId = await createUser(req.body.data);
      const response = {
        isSuccess: true,
        userId
      };
      res.json(response);
    } catch (err) {
      res.status(500).json({ err });
    }
  } else {
    res.status(400).json({ msg: 'Method Not Allowed' });
  }
}
