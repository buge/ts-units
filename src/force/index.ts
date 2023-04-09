import * as dimension from './dimension';
import {Arithmetic, NativeArithmetic} from '../arithmetic';
import {Quantity, Unit} from '../unit';
import {withValueType as lengthWithValueType} from '../length';
import {withValueType as massWithValueType} from '../mass';
import {withValueType as timeWithValueType} from '../time';

/** A quantity of force. */
export type Force<NumberType = number> = Quantity<NumberType, dimension.Force>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const {kilograms} = massWithValueType(arithmetic);
  const {meters} = lengthWithValueType(arithmetic);
  const {seconds} = timeWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The newton, symbol `N`, is the SI unit for force. */
    static newtons: Unit<NumberType, dimension.Force> = kilograms
      .times(meters)
      .per(seconds.squared())
      .withSymbol('N');
  }

  return WithValueType;
}

export const {newtons} = withValueType(NativeArithmetic);
