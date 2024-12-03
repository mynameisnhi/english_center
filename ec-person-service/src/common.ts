import { nanoid } from 'nanoid';

export const generateID = (
  ids: string[] = [],
  size = 5,
  options: { prefix?: string } = {},
): string => {
  const id = `${options?.prefix ?? ''}${nanoid(size)}`;
  if (ids.includes(id)) return generateID(ids, size, options);
  return id;
};
