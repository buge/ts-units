import * as dimension from './dimension';
import {Arithmetic, NativeArithmetic} from '../arithmetic';
import {Quantity, makeUnitFactory} from '../unit';

/** A quantity of length. */
export type Length<NumberType = number> = Quantity<
  NumberType,
  dimension.Length
>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const {makeUnit} = makeUnitFactory(arithmetic);

  class WithValueType {
    private constructor() {}

    /**
     * The meter, symbol `m`, is the SI base unit of length. All other units in
     * this module are defined as scaled values of the meter.
     */
    static meters = makeUnit('m', dimension.Length);
    static kilometers = WithValueType.meters.withSiPrefix('k');
    static centimeters = WithValueType.meters.withSiPrefix('c');
    static millimeters = WithValueType.meters.withSiPrefix('m');
    static micrometers = WithValueType.meters.withSiPrefix('μ');
    static nanometers = WithValueType.meters.withSiPrefix('n');
    static picometers = WithValueType.meters.withSiPrefix('p');
    static femtometers = WithValueType.meters.withSiPrefix('f');

    static fermi = WithValueType.femtometers;
    static angstroms = WithValueType.meters.times(1e-10).withSymbol('Å');
    static microns = WithValueType.micrometers;

    // Imperial units
    static yards = WithValueType.meters.times(0.9144).withSymbol('yd');
    static feet = WithValueType.yards.per(3).withSymbol('ft');
    static inches = WithValueType.feet.per(12).withSymbol('in');
    static chains = WithValueType.yards.times(22).withSymbol('ch');
    static furlongs = WithValueType.chains.times(10).withSymbol('fur');
    static miles = WithValueType.furlongs.times(8).withSymbol('mi');

    // Marine units
    static fathoms = WithValueType.yards.times(2).withSymbol('ftm');
    static nauticalMiles = WithValueType.meters.times(1852).withSymbol('M');

    // Astronomical Units
    static astronomicalUnits = WithValueType.meters
      .times(149597870700)
      .withSymbol('au');
  }

  return WithValueType;
}

export const {
  meters,
  kilometers,
  centimeters,
  millimeters,
  micrometers,
  nanometers,
  picometers,
  femtometers,
  fermi,
  angstroms,
  microns,
  yards,
  feet,
  inches,
  chains,
  furlongs,
  miles,
  fathoms,
  nauticalMiles,
  astronomicalUnits
} = withValueType(NativeArithmetic);
