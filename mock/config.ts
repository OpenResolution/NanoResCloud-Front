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
      na: '@pick(["0.5", "1", "1.5"])',
    },
  ],
});

function getUserConfigs(req: Request, res: Response, u: string) {
  const result = {
    data: configs.array,
    // total: configs.array.length,
    // success: true,
  };

  return res.json(result);
}

function createConfig(req: Request, res: Response, u: string) {
  const configFormFields = req.query;

  const result = {
    success: true,
  };

  configs.array.unshift({
    ...mockjs.mock({
      config_id: '@id',
    }),
    ...configFormFields,
  });

  return res.json(result);
}

function deleteConfigs(req: Request, res: Response, u: string, b: Request) {
  const { config_ids } = req.query;
  const result = {
    success: true,
  };

  configs.array = configs.array.filter((item) => config_ids?.indexOf(item.config_id) === -1);
  //configs.array = configs.array.filter((obj) => !(obj.config_id in config_ids));

  return res.json(result);
}

function editConfig(req: Request, res: Response, u: string) {
  const nextConfig = req.query;
  const result = {
    success: true,
  };

  configs.array = configs.array.map((item) => {
    if (item.config_id === nextConfig.config_id) {
      return nextConfig;
    }
    return item;
  });
  return res.json(result);
}

export default {
  'GET /api/config/getUserConfigs': getUserConfigs,
  'POST /api/config': createConfig,
  'DELETE /api/config': deleteConfigs,
  'PUT /api/config': editConfig,
};
