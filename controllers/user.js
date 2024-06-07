const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const TOKEN_EXPIRES_IN = '21 days';

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user !== null) {
      return res.status(409).send({ message: 'Email already in use' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: passwordHash,
    });

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES_IN }
    );

    await User.findByIdAndUpdate(user._id, {
      token,
    });

    res.status(201).send({
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user === null) {
      console.log(user);

      return res.status(401).send({ message: 'Email or password is wrong' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      console.log(2);

      return res.status(401).send({ message: 'Email or password is wrong' });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES_IN }
    );

    await User.findByIdAndUpdate(user._id, {
      token,
    });

    res.send({
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// ###################################

const currentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user === null) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.send({
      token: user.token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  currentUser,
};
