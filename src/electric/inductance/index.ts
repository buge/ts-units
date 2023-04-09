import * as dimension from './dimension';
import {Arithmetic, NativeArithmetic} from '../../arithmetic';
import {Quantity, Unit} from '../../unit';
import {withValueType as currentWithValueType} from '../current';
import {withValueType as lengthWithValueType} from '../../length';
import {withValueType as massWithValueType} from '../../mass';
import {withValueType as timeWithValueType} from '../../time';

/** A quantity of electrical inductance. */
export type Inductance<NumberType = number> = Quantity<
  NumberType,
  dimension.Inductance
>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const {amperes} = currentWithValueType(arithmetic);
  const {meters} = lengthWithValueType(arithmetic);
  const {kilograms} = massWithValueType(arithmetic);
  const {seconds} = timeWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The henry, symbol `H`, is the SI unit for electrical inductance. */
    static henries: Unit<NumberType, dimension.Inductance> = kilograms
      .times(meters.squared())
      .per(seconds.squared())
      .per(amperes.squared())
      .withSymbol('H');
  }

  return WithValueType;
}

export const {henries} = withValueType(NativeArithmetic);
