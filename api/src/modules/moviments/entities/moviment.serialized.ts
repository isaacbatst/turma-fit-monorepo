import { MuscleSerialized } from '../../muscles/entities/muscle.serialized';

export type MovimentSerialized = {
  id: string;
  name: string;
  muscle: MuscleSerialized;
};
