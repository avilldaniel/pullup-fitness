import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
import { prisma } from "../../utils/db";

// const newUser = await prisma.user.create({
//   data: {
//     email: data.email,
//     name: data.name,
//     username: data.username,
//   },
// });
// const users = await prisma.user.findMany();
// console.log(users);
const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  return res.status(200).json(body);
  // const user = await prisma.user.create({
  //   data: {
  //     email:
  //   }
  // })
};

export default handle;
