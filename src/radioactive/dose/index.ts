import * as dimension from './dimension';
import {Arithmetic, NativeArithmetic} from '../../arithmetic';
import {Quantity, Unit} from '../../unit';
import {withValueType as lengthWithValueType} from '../../length';
import {withValueType as timeWithValueType} from '../../time';

/** A quantity of a radioactive dose. */
export type Dose<NumberType = number> = Quantity<NumberType, dimension.Dose>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const {meters} = lengthWithValueType(arithmetic);
  const {seconds} = timeWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The gray, symbol `Gy`, is the SI unit for absorbed dose. */
    static grays: Unit<NumberType, dimension.Dose> = meters
      .squared()
      .per(seconds.squared())
      .withSymbol('Gy');

    /** The sievert, symbol `Sv`, is the SI unit for equivalent dose. */
    static sieverts: Unit<NumberType, dimension.Dose> = meters
      .squared()
      .per(seconds.squared())
      .withSymbol('Sv');
  }

  return WithValueType;
}

export const {grays, sieverts} = withValueType(NativeArithmetic);
