import {MeasureOptions, benchmark} from 'kelonio';
import {makeUnit} from '../src/unit';

const OPTIONS: Partial<MeasureOptions> = {
  iterations: 1000
};

describe('benchmark', () => {
  it('makeUnit', async () => {
    await benchmark.record(() => {
      makeUnit('m', {length: 1});
    }, OPTIONS);
  });

  it('makeQuantity', async () => {
    const meters = makeUnit('m', {length: 1});
    await benchmark.record(() => {
      meters(20);
    }, OPTIONS);
  });

  it('plus', async () => {
    const meters = makeUnit('m', {length: 1});
    const length1 = meters(20);

    const yards = meters.times(0.9144);
    const length2 = yards(13);

    await benchmark.record(() => {
      length1.plus(length2);
    }, OPTIONS);
  });
});
