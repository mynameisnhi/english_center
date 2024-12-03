import { registerAs } from '@nestjs/config';

import { name, version } from '../../package.json';

export default registerAs(
  'doc',
  (): Record<string, any> => ({
    name: `${name} APIs Specification`,
    description: 'Section for describe whole APIs',
    version,
    prefix: '/docs',
  }),
);
