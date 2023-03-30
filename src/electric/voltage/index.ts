import * as dimension from './dimension';
import {Arithmetic, NativeArithmetic} from '../../arithmetic';
import {Quantity, Unit} from '../../unit';
import {withValueType as currentWithValueType} from '../current';
import {withValueType as lengthWithValueType} from '../../length';
import {withValueType as massWithValueType} from '../../mass';
import {withValueType as timeWithValueType} from '../../time';

/** A quantity of voltage. */
export type Voltage<NumberType = number> = Quantity<
  NumberType,
  dimension.Voltage
>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const {amperes} = currentWithValueType(arithmetic);
  const {meters} = lengthWithValueType(arithmetic);
  const {kilograms} = massWithValueType(arithmetic);
  const {seconds} = timeWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The volt, symbol `V`, is the SI unit for voltage. */
    static volts: Unit<NumberType, dimension.Voltage> = kilograms
      .times(meters.squared())
      .per(seconds.cubed())
      .per(amperes)
      .withSymbol('V');
  }

  return WithValueType;
}

export const {volts} = withValueType(NativeArithmetic);
