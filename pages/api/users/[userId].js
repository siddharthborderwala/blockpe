import { getUserById } from "~/server/firebaseUtils";


async function getUserDetails(res, userId) {
  try {
    const user = await getUserById(userId);
    const response = {
      isSuccess: true,
      data: user,
    };
    res.json(response);
  } catch (err) {
    res.status(500).json({ err });
  }
}

async function updateUserDetails(res, userId) {
  try {
    await updateUser(userId);
    const response = {
      isSuccess: true,
    };
    res.json(response);
  } catch (err) {
    res.status(500).json({ err });
  }
}

export default function handler(req, res) {
  const userId = req.query.userId;
  const payload = req.body.data;
  switch(req.method) {
    case "GET": {
      getUserDetails(res, userId);
      break;
    }
    case "PUT": {
      updateUserDetails(res, payload)
      break;
    }
    default : {
      res.status(400).json({ msg: "Method Not Allowed" });
    }
    
  } 
}
