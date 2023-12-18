import { UnknownObject } from '../../common/types/UnknownObject';
import { OrderedListItemSerialized } from './ordered-list-item.serialized';

export type OrderedListSerialized<S extends UnknownObject> =
  OrderedListItemSerialized<S>[];
