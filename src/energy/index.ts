import * as dimension from './dimension';
import {Arithmetic, NativeArithmetic} from '../arithmetic';
import {Quantity, Unit} from '../unit';
import {withValueType as lengthWithValueType} from '../length';
import {withValueType as massWithValueType} from '../mass';
import {withValueType as timeWithValueType} from '../time';

/** A quantity of energy. */
export type Energy<NumberType = number> = Quantity<
  NumberType,
  dimension.Energy
>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const {meters} = lengthWithValueType(arithmetic);
  const {kilograms} = massWithValueType(arithmetic);
  const {seconds} = timeWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The joule, symbol `J`, is the SI unit for energy. */
    static joules: Unit<NumberType, dimension.Energy> = kilograms
      .times(meters.squared())
      .per(seconds.squared())
      .withSymbol('J');
  }

  return WithValueType;
}

export const {joules} = withValueType(NativeArithmetic);
