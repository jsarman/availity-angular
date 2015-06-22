/* global describe, it, availity, expect */
describe('deep is equal', function() {

  'use strict';

  it('returns true if both objects are undefined', function() {
    expect(availity.deepIsEqual()).toBe(true);
  });
  it('returns true if both objects are empty arrays', function() {
    expect(availity.deepIsEqual([],[])).toBe(true);
  });
  it('returns true if both objects are empty objects', function() {
    expect(availity.deepIsEqual({},{})).toBe(true);
  });
  it('returns false if one object is undefined and the other is null', function() {
    expect(availity.deepIsEqual(undefined,null)).toBe(false);
  });
  it('returns false if one object is array and the other is not', function() {
    expect(availity.deepIsEqual([],1)).toBe(false);
    expect(availity.deepIsEqual(1,[])).toBe(false);
  });
  it('returns false if one object is array and the other is undefined', function() {
    expect(availity.deepIsEqual([])).toBe(false);
    expect(availity.deepIsEqual(undefined,[])).toBe(false);
  });
  it('returns false if one object is object and the other is not', function() {
    expect(availity.deepIsEqual({},1)).toBe(false);
    expect(availity.deepIsEqual(1,{})).toBe(false);
  });
  it('returns false if one object is object and the other is undefined', function() {
    expect(availity.deepIsEqual({})).toBe(false);
    expect(availity.deepIsEqual(undefined, {})).toBe(false);
  });
  it('returns false if one object is object and the other is array', function() {
    expect(availity.deepIsEqual({},[])).toBe(false);
    expect(availity.deepIsEqual([],{})).toBe(false);
  });
  it('returns false if both objects are primitives and not equal', function() {
    expect(availity.deepIsEqual(1,2)).toBe(false);
  });
  it('returns false if objects are different types', function() {
    expect(availity.deepIsEqual(1,'1')).toBe(false);
  });
  it('returns true if both objects are primitives and equal', function() {
    expect(availity.deepIsEqual(1,1)).toBe(true);
  });
  it('returns false if objects are arrays of different sizes', function() {
    expect(availity.deepIsEqual([1],[1,2])).toBe(false);
  });
  it('returns false if objects are arrays of same size with different data', function() {
    expect(availity.deepIsEqual([1,3],[1,2])).toBe(false);
  });
  it('returns true if objects are arrays of same size with same data', function() {
    expect(availity.deepIsEqual([1,2],[1,2])).toBe(true);
  });
  it('returns false if objects have different property values', function() {
    expect(availity.deepIsEqual({id:1, name:'stuff'},{id:1, name:'stuff2'})).toBe(false);
  });
  it('returns true if objects have same property values', function() {
    expect(availity.deepIsEqual({id:1, name:'stuff'},{id:1, name:'stuff'})).toBe(true);
  });
  it('returns false if object has property that other does not', function() {
    expect(availity.deepIsEqual({id:1, name:'stuff'},{id:1})).toBe(false);
    expect(availity.deepIsEqual({id:1},{id:1, name:'stuff'})).toBe(false);
  });
  it('test for complex objects that are not equal', function() {
    var thing1 = {
      prop1: 123,
      myArray: [{thing: 'abc', other: [1,2,3]}],
      myObj: {
        id: 1,
        name: 'stuff'
      }
    };
    var thing2 = {
      prop1: 123,
      myArray: [{thing: 'abc', other: [1,2,4]}],
      myObj: {
        id: 1,
        name: 'stuff'
      }
    };
    expect(availity.deepIsEqual(thing1, thing2)).toBe(false);
    thing2 = {
      prop1: 123,
      myArray: [{thing: 'abc', other: [1,2,3]}],
      myObj: {
        id: 1,
        name: 'stuff2'
      }
    };
    expect(availity.deepIsEqual(thing1, thing2)).toBe(false);
    thing2 = {
      prop1: 123,
      myArray: [{thing: 'abcd', other: [1,2,3]}],
      myObj: {
        id: 1,
        name: 'stuff'
      }
    };
    expect(availity.deepIsEqual(thing1, thing2)).toBe(false);
  });
  it('test for complex objects that are equal', function() {
    var thing1 = {
      prop1: 123,
      myArray: [{thing: 'abc', other: [1,2,3]}],
      myObj: {
        id: 1,
        name: 'stuff'
      }
    };
    var thing2 = {
      prop1: 123,
      myArray: [{thing: 'abc', other: [1,2,3]}],
      myObj: {
        id: 1,
        name: 'stuff'
      }
    };
    expect(availity.deepIsEqual(thing1, thing2)).toBe(true);
  });
});
