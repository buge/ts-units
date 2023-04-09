import * as dimension from './dimension';
import {Arithmetic, NativeArithmetic} from '../../arithmetic';
import {Quantity, makeUnitFactory} from '../../unit';

/** A quantity of luminous intensity. */
export type Intensity<NumberType = number> = Quantity<
  NumberType,
  dimension.Intensity
>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const {makeUnit} = makeUnitFactory(arithmetic);

  class WithValueType {
    private constructor() {}

    /**
     * The candela, symbol `cd`, is the SI base unit of luminous intensity. All
     * other units in this module are defined as scaled values of the candela.
     */
    static candelas = makeUnit('cd', dimension.Intensity);
  }

  return WithValueType;
}

export const {candelas} = withValueType(NativeArithmetic);
