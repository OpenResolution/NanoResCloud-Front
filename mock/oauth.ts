import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const access_token_value = 'AccessTokenValue';

export default {
  'GET /api/users/me': (req: Request, res: Response) => {
    if (req.headers.authorization !== `Bearer ${access_token_value}`) {
      res.status(401).send({
        data: {
          isLogin: false,
        },
        errorCode: '401',
        errorMessage: 'Please login!',
        success: false,
      });
      return;
    }
    res.send({
      user_name: 'Nano',
      user_id: '1',
      user_email: 'user@example.com',
    });
  },
  'POST /api/auth/login': async (req: Request, res: Response) => {
    const { email, password } = req.body;
    await waitTime(2000);
    if (password === 'password' && email === 'user@example.com') {
      res.send({
        access_token: access_token_value,
      });
      return;
    }
    res.status(401).send({
      data: {},
      errorCode: '401',
      errorMessage: 'Login failed!',
      success: false,
    });
  },
  'POST /api/auth/logout': (req: Request, res: Response) => {
    res.send({
      status_code: '200',
      msg: 'logout successful',
      data: '',
    });
  },
};
