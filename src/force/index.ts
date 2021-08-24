import * as dimension from './dimension';
import {Quantity, Unit} from '../unit';
import {kilogram} from '../mass';
import {meters} from '../length';
import {seconds} from '../time';

/** A quantity of force. */
export type Force = Quantity<dimension.Force>;

/** The newton, symbol `N`, is the SI unit for force. */
export const newton: Unit<dimension.Force> = kilogram
  .times(meters)
  .per(seconds.squared())
  .withSymbol('N');
