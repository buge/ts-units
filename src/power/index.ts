import * as dimension from './dimension';
import {Arithmetic, NativeArithmetic} from '../arithmetic';
import {Quantity, Unit} from '../unit';
import {withValueType as lengthWithValueType} from '../length';
import {withValueType as massWithValueType} from '../mass';
import {withValueType as timeWithValueType} from '../time';

/** A quantity of power. */
export type Power<NumberType = number> = Quantity<NumberType, dimension.Power>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const {meters} = lengthWithValueType(arithmetic);
  const {kilograms} = massWithValueType(arithmetic);
  const {seconds} = timeWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The watt, symbol `W`, is the SI unit for power. */
    static watts: Unit<NumberType, dimension.Power> = kilograms
      .times(meters.squared())
      .per(seconds.cubed())
      .withSymbol('W');
  }

  return WithValueType;
}

export const {watts} = withValueType(NativeArithmetic);
