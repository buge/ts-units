import * as dimension from './dimension';
import {Quantity, Unit} from '../../unit';
import {candela} from '../intensity';
import {meters} from '../../length';

/** A quantity of illuminance. */
export type Illuminance = Quantity<dimension.Illuminance>;

/** The lux, symbol `lx`, is the SI unit for illuminance. */
export const lux: Unit<dimension.Illuminance> = candela
  .per(meters.squared())
  .withSymbol('lx');
