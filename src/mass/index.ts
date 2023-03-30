import * as dimension from './dimension';
import {Arithmetic, NativeArithmetic} from '../arithmetic';
import {Quantity, makeUnitFactory} from '../unit';

/** A quantity of mass. */
export type Mass<NumberType = number> = Quantity<NumberType, dimension.Mass>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const {makeUnit} = makeUnitFactory(arithmetic);

  class WithValueType {
    private constructor() {}

    /**
     * The kilogram, symbol `kg` is the SI base unit of mass. All other units in
     * this module are defined as scaled values of the kilogram.
     */
    static kilograms = makeUnit('kg', dimension.Mass);

    static grams = WithValueType.kilograms.times(1e-3).withSymbol('g');
  }

  return WithValueType;
}

export const {kilograms, grams} = withValueType(NativeArithmetic);
