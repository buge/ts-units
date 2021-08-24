import * as dimension from './dimension';
import {Quantity, Unit} from '../unit';
import {kilogram} from '../mass';
import {meters} from '../length';
import {seconds} from '../time';

/** A quantity of energy. */
export type Energy = Quantity<dimension.Energy>;

/** The joule, symbol `J`, is the SI unit for energy. */
export const joule: Unit<dimension.Energy> = kilogram
  .times(meters.squared())
  .per(seconds.squared())
  .withSymbol('J');
