import {
  addUser,
  createLink,
  getUserByWalletAddress,
} from '../../../server/firebaseUtils';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { wallet_address } = req.body;
    try {
      const user = await getUserByWalletAddress(wallet_address);
      const paymentId = await createLink(user.id, req.body);

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
