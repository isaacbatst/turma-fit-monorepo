export type Serializable<S extends object> = {
  toJSON(): S;
};
