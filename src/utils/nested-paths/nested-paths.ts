import { Primitive } from '../_types';

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

type Dot<Key extends string, Previous extends Primitive> = '' extends Previous
  ? Key
  : `${Key}.${Previous & string}`;

export type NestedDotPath<
  TValue,
  TDepth extends number = 4,
  TValueType extends Primitive = Primitive,
> = [TDepth] extends [never]
  ? never
  : TValue extends TValueType
  ? ''
  : {
      [Key in Extract<keyof TValue, string>]-?: TValue[Key] extends TValueType
        ? Key & string
        : Dot<Key, NestedDotPath<TValue[Key], Prev[TDepth], TValueType>>;
    }[Extract<keyof TValue, string>];
