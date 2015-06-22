/* global describe, it, availity, expect */
describe('deep extend', function() {

  'use strict';

  it('performs a simple extend', function() {
    var result = {id: 1};
    availity.deepExtend(result, {id: 2, name: 'two'});
    expect(result.id).toBe(2);
    expect(result.name).toBe('two');
  });
  it('extends in order', function() {
    var result = {id: 1};
    availity.deepExtend(result, {id: 2, name: 'two'}, {id: 3});
    expect(result.id).toBe(3);
    expect(result.name).toBe('two');
  });
  it('extends objects from destination', function() {
    var result = {id: 1};
    var params = {value: 'stuff'};
    availity.deepExtend(result, {params: params});
    expect(result.id).toBe(1);
    expect(result.params).toBeDefined();
    expect(result.params.value).toBe('stuff');
  });
  it('extends arrays from destination', function() {
    var result = {id: 1};
    availity.deepExtend(result, {numbers: [1,2,3]});
    expect(result.id).toBe(1);
    expect(result.numbers).toBeDefined();
    expect(result.numbers.length).toBe(3);
  });
  it('extends DOM nodes correctly', function() {
    var result = {id: 1};
    var element = $('<span id="mySpan"></span>');
    availity.deepExtend(result, {element: element});
    expect(result.id).toBe(1);
    expect(result.element).toBe(element);
  });
  it('deep extends objects', function() {
    var result = {id: 1, params: {name: {first: 'Bob', last: 'Smith', middle: 'Bubba'}}};
    availity.deepExtend(result, {params: {name: {first: 'John', last: 'Johnson'}}}, {params: {name: {first: 'Frank'}}});
    expect(result.id).toBe(1);
    expect(result.params.name.first).toBe('Frank');
    expect(result.params.name.last).toBe('Johnson');
    expect(result.params.name.middle).toBe('Bubba');
  });
});
