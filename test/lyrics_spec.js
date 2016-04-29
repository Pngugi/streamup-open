// Pre-run
import chai from 'chai';
import { givenAsync } from 'mocha-testdata';

chai.should();

// Mock expected globals
global.PlaybackAPI = {
  on: () => {},
};

// Actual Test Imports
const resolveLyrics = require('../build/main/features/core/lyrics').resolveLyrics;
import { validSongs, invalidSongs } from './testdata/lyrics';

describe('Lyrics', () => {
  givenAsync(...validSongs).it('should resolve when given a valid song object', (done, song) => {
    resolveLyrics(song)
      .then((lyrics) => {
        lyrics.should.be.a('string');
        done();
      })
      .catch(() => done(new Error(`Failed to fetch lyrics for song: ${song.title}`)));
  });

  givenAsync(...invalidSongs).it('should fail when given an invalid song object', (done, song) => {
    resolveLyrics(song)
      .then((lyrics) => {
        lyrics.should.be.equal(null);
        done();
      })
      .catch(() => done());
  });

  givenAsync(...validSongs).it('should not contain any script tags when resolved', (done, song) => {
    resolveLyrics(song)
      .then((lyrics) => {
        /<script/g.test(lyrics).should.be.equal(false);
        done();
      })
      .catch(() => done(new Error('Failed to fetch lyrics in this test')));
  });
});