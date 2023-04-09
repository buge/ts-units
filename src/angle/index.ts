import * as dimension from './dimension';
import {Arithmetic, NativeArithmetic} from '../arithmetic';
import {Geometric, NativeGeometric} from '../geometric';
import {Quantity, makeUnitFactory} from '../unit';

export type Angle<NumberType = number> = Quantity<NumberType, dimension.Angle>;

export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
  geometric: Geometric<NumberType>
) {
  const {makeUnit} = makeUnitFactory(arithmetic);
  const {toNative} = arithmetic;
  const {sin, cos, tan, asin, acos, atan, atan2} = geometric;

  class WithValueType {
    private constructor() {}

    static radians = makeUnit('rad', dimension.Angle);
    static degrees = WithValueType.radians
      .times(Math.PI)
      .per(180)
      .withSymbol('º');

    static turns = WithValueType.radians
      .times(2)
      .times(Math.PI)
      .withSymbol('τ');

    /**
     * Returns the sine of an angle.
     * @param x An Angle
     */
    static sin = liftUnary(sin);

    /**
     * Returns the cosine of an angle.
     * @param x An Angle
     */
    static cos = liftUnary(cos);

    /**
     * Returns the tangent of an angle.
     * @param x An Angle
     */
    static tan = liftUnary(tan);

    /**
     * Returns the arcsine of a number.
     * @param x A numeric expression.
     */
    static asin = liftRet(asin);

    /**
     * Returns the arc cosine (or inverse cosine) of a number.
     * @param x A numeric expression.
     */
    static acos = liftRet(acos);

    /**
     * Returns the arctangent of a number.
     * @param x A numeric expression.
     */
    static atan = liftRet(atan);

    /**
     * Returns the angle from the X axis to a point.
     *
     * @param x A numeric expression representing the cartesian x-coordinate.
     * @param y A numeric expression representing the cartesian y-coordinate.
     */
    static atan2(x: NumberType, y: NumberType): Angle<NumberType> {
      return WithValueType.radians(toNative(atan2(x, y)));
    }
  }

  function liftRet(
    f: (x: NumberType) => NumberType
  ): (x: NumberType) => Angle<NumberType> {
    return x => WithValueType.radians(toNative(f(x)));
  }

  function liftUnary(
    f: (x: NumberType) => NumberType
  ): (x: Angle<NumberType>) => NumberType {
    return x => f(x.in(WithValueType.radians).amount);
  }

  return WithValueType;
}

export const {radians, degrees, turns, sin, cos, tan, asin, acos, atan, atan2} =
  withValueType(NativeArithmetic, NativeGeometric);
