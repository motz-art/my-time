/* eslint-env mocha */
import expect from 'expect.js';
import formatTime from './format-time.js';

describe('format-time', () => {
  const testCases = [
    [0, '00:00'],
    [1000, '00:01'],
    [60000, '01:00'],
    [3600000, '1:00:00'],
    [36000000, '10:00:00'],
    [86400000, '1.00:00:00'],
    [499, '00:00'],
    [500, '00:01'],
    [-1, '00:00'],
    [-499, '00:00'],
    [-500, '-00:01'],
    [-1000, '-00:01'],
    [-60000, '-01:00'],
    [-60000, '-01:00']
  ];

  testCases.forEach(test =>
    it(`should return ${test[1]} when called with ${test[0]}`, () => {
      expect(formatTime(test[0])).to.be(test[1]);
    })
  );
});
