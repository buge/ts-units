import * as dimension from './dimension';
import {Arithmetic, NativeArithmetic} from '../arithmetic';
import {Quantity, Unit} from '../unit';
import {withValueType as lengthWithValueType} from '../length';
import {withValueType as massWithValueType} from '../mass';
import {withValueType as timeWithValueType} from '../time';

/** A quantity of pressure. */
export type Pressure<NumberType = number> = Quantity<
  NumberType,
  dimension.Pressure
>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const {meters} = lengthWithValueType(arithmetic);
  const {kilograms} = massWithValueType(arithmetic);
  const {seconds} = timeWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The pascal, symbol `Pa`, is the SI unit for force. */
    static pascals: Unit<NumberType, dimension.Pressure> = kilograms
      .per(meters)
      .per(seconds.squared())
      .withSymbol('Pa');
  }

  return WithValueType;
}

export const {pascals} = withValueType(NativeArithmetic);
