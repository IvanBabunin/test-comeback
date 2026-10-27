import { formatPrice } from './format-price';

describe('formatPrice', () => {
  it('formats whole amounts without decimals', () => {
    expect(formatPrice(1200, 'en-US', 'USD')).toBe('$1,200');
  });

  it('keeps two decimals for fractional amounts', () => {
    expect(formatPrice(9.5, 'en-US', 'USD')).toBe('$9.50');
  });
});
