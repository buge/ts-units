import * as dimension from './dimension';
import {Quantity, Unit} from '../unit';
import {kilograms} from '../mass';
import {meters} from '../length';
import {seconds} from '../time';

/** A quantity of force. */
export type Force<NumberType = number> = Quantity<NumberType, dimension.Force>;

/** The newton, symbol `N`, is the SI unit for force. */
export const newtons: Unit<number, dimension.Force> = kilograms
  .times(meters)
  .per(seconds.squared())
  .withSymbol('N');
