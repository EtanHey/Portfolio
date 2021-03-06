import post from "../model/postModel";

import jwt from "jwt-simple";
const secret = process.env.JWT_SECRET;

export const getPostsList = async (req, res) => {
  try {
    const rest = req.cookies["currentUserInfo"];
    const userInfo = jwt.decode(rest, secret);
    console.log(userInfo,'userInfo');
    const userId = userInfo.loginData.result._id;
    if (userId) {
      let currentUsersPostsList = await post.find({ ownerId: userId });
      res.send(currentUsersPostsList);
      // const decoded = jwt.decode(userId, secret)
      // const {userId, role} = decoded;
      // console.log(decoded);
    } else {
      console.log("no userId yet");
    }
  } catch (error) {
    console.log(error);
  }
};
export const createNewPost = async (req, res) => {
  try {
    const rest = req.cookies["currentUserInfo"];
const cookies = jwt.decode(rest, secret)

    const newPostInfo = req.body;
    const newPostOwnerInfo = jwt.decode(req.cookies['currentUserInfo'], secret).loginData.result
    console.log(newPostOwnerInfo);
    const {firstName, lastName} = newPostOwnerInfo
console.log(firstName, lastName);

    const { ownerId, content, time} = newPostInfo;
    if (!ownerId || !content || !time || !firstName || !lastName)
      throw new Error(
        `missing something in createNewPost -server side (postCont)`
      );
    const newPost = new post({ ownerId, content, time, ownerFirstName:firstName, ownerLastName:lastName});
    await newPost.save();

    res.send({ newPost });
  } catch (error) {
    console.log(error);
  }
};
