import { addUser, createLink, getUserByWalletAddress } from '../../../server/firebaseUtils';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      name,
      description,
      amount,
      expiry,
      preferred_token_address,
      chainId,
      wallet_address,
      logoUrl
    } = req.body;
    try {
      console.log({body: req.body});
      const user = await getUserByWalletAddress(wallet_address);
      let userId;
      if (!user.id) {
        userId = await addUser({ name, description, wallet_address });
      } else {
        userId = user.id;
      }
      console.log({ userId })
      const paymentId = await createLink(userId, {
        amount,
        expiry,
        preferred_token_address,
        chainId
      });

      const response = {
        isSuccess: true,
        payment_id: paymentId,
      };
      res.json(response);
    } catch (err) {
      res.status(500).json({ err });
    }
  } else {
    res.status(400).json({ msg: 'Method Not Allowed' });
  }
}
