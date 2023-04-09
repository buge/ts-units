import * as dimension from './dimension';
import {Arithmetic, NativeArithmetic} from '../arithmetic';
import {Quantity, Unit} from '../unit';
import {withValueType as lengthWithValueType} from '../length';

/** A quantity of area. */
export type Area<NumberType = number> = Quantity<NumberType, dimension.Area>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const {meters} = lengthWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /**
     * The square meter, symbol `m²`, is the SI unit of area. All other units in
     * this module are defined as scaled values of the square meter.
     */
    static squareMeters: Unit<NumberType, dimension.Area> = meters
      .squared()
      .withSymbol('m²');
  }
  return WithValueType;
}

export const {squareMeters} = withValueType(NativeArithmetic);
