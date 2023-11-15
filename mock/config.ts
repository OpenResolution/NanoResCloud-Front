import { Request, Response } from 'express';
import mockjs from 'mockjs';

const configs = mockjs.mock({
  'array|10': [
    {
      config_id: '@id',
      config_name: '@title',
      config_description: '@sentence',
      config_type: '@pick(["2D", "3D_SINGLE_PLANE", "3D_BI_PLANE"])',
      user_id: '1',
      'na|1-2.3': 1,
    },
  ],
});

function getUserConfigs(req: Request, res: Response, u: string) {
  const result = {
    data: configs.array,
    total: configs.array.length,
    success: true,
  };

  return res.json(result);
}

export default {
  'GET /api/config/getUserConfigs': getUserConfigs,
};
