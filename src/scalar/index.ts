import * as dimension from '../dimension';
import {Arithmetic, NativeArithmetic} from '../arithmetic';
import {Quantity, makeUnitFactory} from '../unit';

export type Scalar<NumberType = number> = Quantity<NumberType, dimension.One>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const {makeUnit} = makeUnitFactory(arithmetic);

  class WithValueType {
    private constructor() {}

    static scalar = makeUnit('', dimension.One);

    static percent = WithValueType.scalar.times(1e-2).withSymbol('%');
    static permille = WithValueType.scalar.times(1e-3).withSymbol('‰');
    static permyriad = WithValueType.scalar.times(1e-4).withSymbol('‱');
  }

  return WithValueType;
}

export const {scalar, percent, permille, permyriad} =
  withValueType(NativeArithmetic);
