import { parseEvents } from './events';

jest.mock('@/helpers/api/client', () => ({ http: {} }));
jest.mock('@/helpers/logger', () => ({ logger: { warn: jest.fn() } }));

const valid = {
  id: '2',
  title: 'React Native Meetup',
  category: 'Tech',
  date: '2026-11-18T19:00:00',
  location: 'Berlin',
  price: 25,
  imageUrl: 'https://picsum.photos/seed/react-native-meetup/900/600',
  isFavorite: false,
  isFeatured: false,
};

describe('parseEvents', () => {
  it('parses a valid list', () => {
    expect(parseEvents([valid])).toEqual([valid]);
  });

  it('treats an empty imageUrl as missing', () => {
    expect(parseEvents([{ ...valid, imageUrl: '' }])[0].imageUrl).toBeUndefined();
    expect(parseEvents([{ ...valid, imageUrl: null }])[0].imageUrl).toBeUndefined();
  });

  it('drops invalid items and keeps the rest', () => {
    const events = parseEvents([valid, { ...valid, id: '3', price: '25' }]);
    expect(events.map((e) => e.id)).toEqual(['2']);
  });

  it('rejects a non-array payload', () => {
    expect(() => parseEvents({ items: [valid] })).toThrow();
  });
});
