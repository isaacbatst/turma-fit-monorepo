import { UnknownObject } from '../../common/types/UnknownObject';

export type OrderedListItemSerialized<S extends UnknownObject> = {
  order: number;
} & S;
