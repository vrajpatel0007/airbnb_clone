const User = require("../models/user.model");

const register = async (body) => {
  return User.create(body);
};


const findemail = async (email) => {
  return await User.findOne({ Email: email });
};
const getUser = async () => {
  return await User.finde()
};
const findId = async (userid) => {
  return await User.findById(userid).populate("Task", { user_id: 0 });
};
const userupdate = async (userid, body) => {
  return await User.findByIdAndUpdate(userid, { $set: body }, { new: true });
};
const deleteUser = async (userid, taskid) => {
  await User.findByIdAndDelete(userid);
};

const usertaskid = async (userid, body) => {
  return await User.findByIdAndUpdate(userid, { Task: body }, { new: true });
};

const passupdate = async (userid, body) => {
  return await User.findByIdAndUpdate(userid, { Password: body }, { new: true });
}



module.exports = {
  register,
  findemail,
  getUser,
  findId,
  userupdate,
  deleteUser,
  usertaskid,
  passupdate,
};
