import * as dimension from './dimension';
import {Quantity, makeUnit} from '../../unit';

export type SolidAngle<NumberType = number> = Quantity<
  NumberType,
  dimension.SolidAngle
>;

export const steradians = makeUnit('sr', dimension.SolidAngle);
export const squareDegrees = steradians
  .times((Math.PI / 180) ** 2)
  .withSymbol('deg²');
