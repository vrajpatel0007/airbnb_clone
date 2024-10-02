const user_service = require("../services/user.service");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  console.log(
    "==================================== registr ===================================="
  );
  const reqbody = req.body;
  console.log("🚀 ~ register ~ reqbody:", reqbody);
  try {
    if (!reqbody) {
      return res.status(400).json({ message: "Invalid request body" });
    }
    const UserExists = await user_service.findemail(reqbody.Email);
    if (UserExists) {
      return res.status(400).json({ message: "email already exists" });
    }
    const bcrpass = await bcrypt.hash(reqbody.Password, 10);
    const body = {
      Username: reqbody.Username,
      Email: reqbody.Email,
      Password: reqbody.Password,
    };
    console.log("🚀 ~ register ~ body:", body)
    const user = await user_service.register(body);
    console.log("🚀 ~ register ~ user:", user)
    return res
      .status(200)
      .json({ message: "User registered successfully", user });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};



// profile
const profile = async (req, res) => {
  try {
    const user = await user_service.findId(req.user._id);
    console.log("🚀 ~ profile ~ user:", user);
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User Profile", user: user });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

// list_User
const userlist = async (req, res) => {
  console.log(
    "==================================== list_User ===================================="
  );
  try {
    const user = await user_service.getUser();
    return res.status(200).json({ message: "All user ", user: user });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// Update_User
const userupdate = async (req, res) => {
  console.log(
    "==================================== Update_User ===================================="
  );
  const userid = req.user._id;
  console.log("🚀 ~ userupdate ~ userid:", userid);
  try {
    const UserExists = await user_service.findId(userid);
    console.log("🚀 ~ userupdate ~ UserExists:", UserExists);
    if (!UserExists) {
      return res.status(404).json({ message: "User Not exists" });
    }
    const body = {};
    if (req.body) {
      body.Username = req.body.Username;
      body.Email = req.body.Email;
    }
    console.log("🚀 ~ userupdate ~ body:", body)
    const userupdate = await user_service.userupdate(userid, body);
    console.log("🚀 ~ userupdate ~ userupdate:", userupdate)
    return res.status(200).json({ message: "User Updated Successfully", userupdate });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// UserById
const userbyid = async (req, res) => {
  console.log(
    "==================================== UserById ===================================="
  );
  const userid = req.user._id;
  console.log("🚀 ~ userbyid ~ userid:", userid)
  try {
    const userExists = await user_service.findId(userid);
    if (!userExists) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const user = await user_service.findId(userid);
    return res
      .status(200)
      .json({ message: "User Finde Successfully", user: user });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// Delete_Users
const usersdelete = async (req, res) => {
  console.log(
    "==================================== Delete_Users ===================================="
  );
  const userid = req.user._id;
  try {
    const userExists = await user_service.findId(userid);
    if (!userExists) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const usrer = await user_service.deleteUser(userid);
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// login
const login = async (req, res) => {
  console.log(
    "==================================== login ===================================="
  );
  try {
    const body = req.body;
    console.log("🚀 ~ login ~ body:", body);
    const Password = req.body.Password;
    console.log("🚀 ~ login ~ Password:", Password);
    const user = await user_service.findemail(body.Email);

    console.log("🚀 ~ login ~ body.Email:", body.Email);
    console.log("🚀 ~ login ~ user:", user);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    if (user.Isverify != true) {
      return res.status(404).json({ message: "Your Email is not verified" });
    }
    const bcryptpass = await bcrypt.compare(Password, user.Password);
    if (!bcryptpass) {
      return res.status(404).json({ message: "Incorrect Password" });
    }
    const payload = {
      _id: user._id,
      email: user.Email,
      rol: user.Rol
    };
    console.log("🚀 ~ login ~ payload.email:", payload);
    const token = jwt.sign(payload, process.env.SECRET_key, {
      expiresIn: "1d",
    });
    const toke = res.cookie("token", token)
    console.log("🚀 ~ login ~ token:", token);
    res.status(200).json({ message: "User Login Successful", token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update password
const updatepassword = async (req, res) => {
  const userid = req.user._id;
  console.log("🚀 ~ updatepassword ~ userid:", userid);
  try {
    const userExists = await user_service.findId(userid);
    console.log("🚀 ~ updatepassword ~ userExists:", userExists);
    if (!userExists) {
      return res.status(400).json({ message: "User Not Found" });
    }
    if (!req.body.Password) {
      return res.status(400).json({ message: "Password nod Difain" });
    }
    if (!req.body.Confirmpassword) {
      return res.status(400).json({ message: "Confirmpassword nod Difain" });
    }
    if (req.body.Password != req.body.Confirmpassword) {
      return res
        .status(400)
        .json({ message: "Confirmpassword and password not match" });
    }
    const pass = await bcrypt.hash(req.body.Password, 10);
    console.log("🚀 ~ updatepassword ~ bcrpass:", pass);
    const usrer = await user_service.passupdate(userid, pass);
    console.log("🚀 ~ updatepassword ~ usrer:", usrer);
    return res
      .status(200)
      .json({ message: "User password Successfully  Update" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};






const signup = async (req, res) => {
  console.log("==================================== Signup ====================================");
  const reqbody = req.body;
  console.log("🚀 ~ register ~ reqbody:", reqbody);
  try {
    if (!reqbody) {
      return res.status(400).json({ message: "Invalid request body" });
    }
    const UserExists = await user_service.findemail(reqbody.Email);
    if (UserExists) {
      return res.status(400).json({ message: "email already exists" });
    }
    const bcrpass = await bcrypt.hash(reqbody.Password, 10);
    const body = {
      Username: reqbody.Username,
      Email: reqbody.Email,
      Password: bcrpass,
      Rol: reqbody.rol
    };
    console.log("🚀 ~ register ~ body:", body)
    const admin = await user_service.register(body)
    console.log("🚀 ~ register ~ Admin:", admin)
    return res
      .status(200)
      .json({ message: "Admin registered successfully", admin });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// adminupdate
const adminupdate = async (req, res) => {

  const userid = req.params.userId;
  console.log("🚀 ~ userupdate ~ userid:", userid);
  try {
    const UserExists = await user_service.findId(userid);
    console.log("🚀 ~ userupdate ~ UserExists:", UserExists);
    if (!UserExists) {
      return res.status(404).json({ message: "User Not exists" });
    }
    const body = {};
    if (req.body) {
      body.Name = req.body.Name;
      body.Email = req.body.Email;
    }
    const userupdate = await user_service.userupdate(userid, body);
    return res.status(200).json({ message: "User Updated Successfully" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}


// admindelete
const admindelete = async (req, res) => {

  const userid = req.params.userId;
  try {
    const userExists = await user_service.findId(userid);
    if (!userExists) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const usrer = await user_service.deleteUser(userid);
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

module.exports = {
  register,
  profile,
  userlist,
  userupdate,
  userbyid,
  usersdelete,
  login,
  updatepassword,



  signup,
  adminupdate,
  admindelete
};
