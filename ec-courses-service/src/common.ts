import { nanoid } from 'nanoid';

export const PATH_UPLOADS = `${process.cwd()}/public/uploads`;

export const generateID = (
  ids: string[] = [],
  size = 5,
  options: { prefix?: string } = {},
): string => {
  const id = `${options?.prefix ?? ''}${nanoid(size)}`;
  if (ids.includes(id) || id.includes('-'))
    return generateID(ids, size, options);
  return id;
};
