export enum Grip {
  pronated = 'pronated',
  supinated = 'supinated',
  neutral = 'neutral',
}

export const gripToFriendlyName = (grip: Grip) => {
  const friendlyNames = {
    [Grip.pronated]: 'Pronada',
    [Grip.supinated]: 'Supinada',
    [Grip.neutral]: 'Neutra',
  };
  return friendlyNames[grip];
};
