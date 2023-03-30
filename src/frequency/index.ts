import * as dimension from './dimension';
import {Arithmetic, NativeArithmetic} from '../arithmetic';
import {Quantity, Unit} from '../unit';
import {withValueType as timeWithValueType} from '../time';

/** A quantity of frequency. */
export type Frequency<NumberType = number> = Quantity<
  NumberType,
  dimension.Frequency
>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const {seconds} = timeWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The hertz, symbol `Hz`, is the SI unit for frequency. */
    static hertz: Unit<NumberType, dimension.Frequency> = seconds
      .reciprocal()
      .withSymbol('Hz');
  }

  return WithValueType;
}

export const {hertz} = withValueType(NativeArithmetic);
