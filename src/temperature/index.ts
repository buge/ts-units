import * as dimension from './dimension';
import {Arithmetic, NativeArithmetic} from '../arithmetic';
import {Quantity, makeUnitFactory} from '../unit';

/** A quantity of thermodynamic temperature. */
export type Temperature<NumberType = number> = Quantity<
  NumberType,
  dimension.Temperature
>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const {makeUnit} = makeUnitFactory(arithmetic);

  class WithValueType {
    private constructor() {}

    /**
     * The kelvin, symbol `K`, is the SI unit of thermodynamic temperature. All
     * other units in this module are defined as scaled values of the kelvin.
     */
    static kelvin = makeUnit('K', dimension.Temperature);

    static celsius = WithValueType.kelvin.withOffset(-273.15).withSymbol('ºC');
    static fahrenheit = WithValueType.kelvin
      .times(5)
      .per(9)
      .withOffset(-459.67)
      .withSymbol('ºF');
    static rankine = WithValueType.kelvin.per(1.8).withSymbol('ºR');
  }

  return WithValueType;
}

export const {kelvin, celsius, fahrenheit, rankine} =
  withValueType(NativeArithmetic);
