import { example } from '~/lib/example';

describe('Example function', () => {
  it('Should sum two numbers', () => {
    const a = 1;
    const b = 2;

    const result = example(a, b);

    expect(result).toBe(3);
  });
});
