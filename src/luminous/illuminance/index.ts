import * as dimension from './dimension';
import {Arithmetic, NativeArithmetic} from '../../arithmetic';
import {Quantity, Unit} from '../../unit';
import {withValueType as intensityWithValueType} from '../intensity';
import {withValueType as lengthWithValueType} from '../../length';

/** A quantity of illuminance. */
export type Illuminance<NumberType = number> = Quantity<
  NumberType,
  dimension.Illuminance
>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const {candelas} = intensityWithValueType(arithmetic);
  const {meters} = lengthWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The lux, symbol `lx`, is the SI unit for illuminance. */
    static lux: Unit<NumberType, dimension.Illuminance> = candelas
      .per(meters.squared())
      .withSymbol('lx');
  }

  return WithValueType;
}

export const {lux} = withValueType(NativeArithmetic);
