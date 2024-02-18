import * as dimension from './dimension';
import {Arithmetic, NativeArithmetic} from '../../arithmetic';
import {Quantity, makeUnitFactory} from '../../unit';
import {withValueType as scalarWithValueType} from '../../scalar';

export type SolidAngle<NumberType = number> = Quantity<
  NumberType,
  dimension.SolidAngle
>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const {makeUnit} = makeUnitFactory(arithmetic);
  const {scalar} = scalarWithValueType(arithmetic);

  return class WithValueType {
    private constructor() {}

    static steradians = makeUnit('sr', dimension.SolidAngle);
    static squareDegrees = WithValueType.steradians
      .times(scalar(Math.PI).per(180).cubed().value())
      .withSymbol('deg²');
  };
}
export const {steradians, squareDegrees} = withValueType(NativeArithmetic);
