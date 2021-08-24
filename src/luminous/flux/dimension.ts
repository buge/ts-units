/**
 * The dimensions of the SI derived quantity of luminous flux.
 *
 * This would usually by `[J]` but we model solid angles using a dimension
 * (despite actually being a dimensionless quantity) in order to be able to
 * ensure type safety for angles.
 */
export type Flux = {luminousIntensity: 1; angle: 2};
export const Flux: Flux = {luminousIntensity: 1, angle: 2};
