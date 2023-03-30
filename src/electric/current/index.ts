import * as dimension from './dimension';
import {Arithmetic, NativeArithmetic} from '../../arithmetic';
import {Quantity, makeUnitFactory} from '../../unit';

/** A quantity of electric current. */
export type Current<NumberType = number> = Quantity<
  NumberType,
  dimension.Current
>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const {makeUnit} = makeUnitFactory(arithmetic);

  class WithValueType {
    private constructor() {}

    /**
     * The ampere, symbol `A`, is the SI base unit of electric current. All other
     * units in this module are defined as scaled values of the ampere.
     */
    static amperes = makeUnit('A', dimension.Current);
  }

  return WithValueType;
}

export const {amperes} = withValueType(NativeArithmetic);
