import * as dimension from './dimension';
import {Arithmetic, NativeArithmetic} from '../../arithmetic';
import {Quantity, Unit} from '../../unit';
import {withValueType as timeWithValueType} from '../../time';

/** A quantity of radioactivity. */
export type Radioactivity<NumberType = number> = Quantity<
  NumberType,
  dimension.Radioactivity
>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const {seconds} = timeWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The becquerel, symbol `Bq`, is the SI unit for radioactivity. */
    static becquerels: Unit<NumberType, dimension.Radioactivity> = seconds
      .reciprocal()
      .withSymbol('Bq');
  }

  return WithValueType;
}

export const {becquerels} = withValueType(NativeArithmetic);
