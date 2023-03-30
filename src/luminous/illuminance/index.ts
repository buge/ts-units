import * as dimension from './dimension';
import {Quantity, Unit} from '../../unit';
import {candelas} from '../intensity';
import {meters} from '../../length';

/** A quantity of illuminance. */
export type Illuminance<NumberType = number> = Quantity<
  NumberType,
  dimension.Illuminance
>;

/** The lux, symbol `lx`, is the SI unit for illuminance. */
export const lux: Unit<number, dimension.Illuminance> = candelas
  .per(meters.squared())
  .withSymbol('lx');
