/*eslint-disable max-nested-callbacks, no-unused-expressions*/

import fetch from 'isomorphic-fetch';
import HttpError from 'standard-http-error';

import * as api from '../api';
import * as configuration from '../configuration';

const API_ROOT = 'https://mock.getpepperoni.com';
const SIMPLE_ENDPOINT = '/endpoint';
const ERROR_ENDPOINT = '/cant/touch/this';
const PROTECTED_ENDPOINT = '/nothing/to/see/here';
const FAILING_ENDPOINT = '/broken';
const SIMPLE_RESPONSE = {foo: 'bar'};

describe('API', () => {


  beforeEach(() => {
      configuration.setConfiguration('API_ROOT', API_ROOT);
    });

    afterEach(() => {
      configuration.unsetConfiguration('API_ROOT');
    });

  describe('url', () => {
    it('generates a full url from a path using API_ROOT configuration value', async () => {
      expect(api.url('foobar')).toEqual(API_ROOT + '/foobar');
    });

    it('generates a full url with leading forward slash', async () => {
      expect(api.url('/foobar')).toEqual(API_ROOT + '/foobar');
    });
  });


  describe('fishing report', () => {
    it('should get hot waterbodies', async () => {
      let list = await api.getHotWaterBodies();
      console.dir(list[0]);
      expect(list.length).toEqual(146);
    })
  })


});

async function getError(thunk) {
  try {
    await thunk();
    return null;
  } catch (e) {
    return e;
  }
}
