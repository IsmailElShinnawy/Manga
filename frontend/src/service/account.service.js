export const isAdmin = account => {
  const idx = account?.roles?.findIndex(role => role.name === 'admin');
  return idx >= 0;
};
