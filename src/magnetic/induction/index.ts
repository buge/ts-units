import * as dimension from './dimension';
import {Arithmetic, NativeArithmetic} from '../../arithmetic';
import {Quantity, Unit} from '../../unit';
import {withValueType as currentWithValueType} from '../../electric/current';
import {withValueType as massWithValueType} from '../../mass';
import {withValueType as timeWithValueType} from '../../time';

/** A quantity of magnetic induction. */
export type Induction<NumberType = number> = Quantity<
  NumberType,
  dimension.Induction
>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const {amperes} = currentWithValueType(arithmetic);
  const {kilograms} = massWithValueType(arithmetic);
  const {seconds} = timeWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The tesla, symbol `T`, is the SI unit for magnetic induction. */
    static teslas: Unit<NumberType, dimension.Induction> = kilograms
      .per(seconds.squared())
      .per(amperes)
      .withSymbol('T');
  }

  return WithValueType;
}

export const {teslas} = withValueType(NativeArithmetic);
