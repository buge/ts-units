import * as dimension from './dimension';
import {Arithmetic, NativeArithmetic} from '../../arithmetic';
import {Quantity, Unit} from '../../unit';
import {withValueType as currentWithValueType} from '../../electric/current';
import {withValueType as lengthWithValueType} from '../../length';
import {withValueType as massWithValueType} from '../../mass';
import {withValueType as timeWithValueType} from '../../time';

/** A quantity of magnetic flux. */
export type Flux<NumberType = number> = Quantity<NumberType, dimension.Flux>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const {amperes} = currentWithValueType(arithmetic);
  const {meters} = lengthWithValueType(arithmetic);
  const {kilograms} = massWithValueType(arithmetic);
  const {seconds} = timeWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The weber, symbol `Wb`, is the SI unit for magnetic flux. */
    static webers: Unit<NumberType, dimension.Flux> = kilograms
      .times(meters.squared())
      .per(seconds.squared())
      .per(amperes)
      .withSymbol('Wb');
  }

  return WithValueType;
}

export const {webers} = withValueType(NativeArithmetic);
