import {
  addUser,
  createLink,
  getUserByWalletAddress,
} from '../../../server/firebaseUtils';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      wallet_address
    } = req.body.data;
    try {
      const user = await getUserByWalletAddress(wallet_address);
      // let userId;
      // if (!user.id) {
      //   userId = await addUser({ name, description, wallet_address });
      // } else {
      //   userId = user.id;
      // }
      console.log({ user })
      const paymentId = await createLink(user.id, req.body.data);

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
