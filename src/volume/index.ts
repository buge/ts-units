import * as dimension from './dimension';
import {Arithmetic, NativeArithmetic} from '../arithmetic';
import {Quantity, Unit} from '../unit';
import {withValueType as lengthWithValueType} from '../length';

/** A quantity of volume. */
export type Volume<NumberType = number> = Quantity<
  NumberType,
  dimension.Volume
>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const {meters} = lengthWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /**
     * The cubic meter, symbol `m³`, is the SI unit of area. All other units in
     * this module are defined as scaled values of the cubic meter.
     */
    static cubicMeters: Unit<NumberType, dimension.Volume> = meters
      .cubed()
      .withSymbol('m³');
  }

  return WithValueType;
}

export const {cubicMeters} = withValueType(NativeArithmetic);
