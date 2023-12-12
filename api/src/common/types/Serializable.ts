import { UnknownObject } from './UnknownObject';

export type Serializable<S extends UnknownObject> = {
  toJSON(): S;
};
