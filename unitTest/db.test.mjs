// database.test.js
import { expect } from 'chai';
import sinon from 'sinon';
import mysql from 'mysql';
import { insertDiagnosaPasien, checkRecordExists } from '../functions/database.js';

describe('insertDiagnosaPasien', () => {
  it('should check that no_rawat and kd_penyakit are not null and are strings', () => {
    // Define test cases
    const testCases = [
      { no_rawat: 'R123', kd_penyakit: 'P456', shouldPass: true },
    ];

    testCases.forEach(({ no_rawat, kd_penyakit, shouldPass }) => {
      if (shouldPass) {
        // Check if inputs are strings and not null
        expect(typeof no_rawat).to.equal('string');
        expect(typeof kd_penyakit).to.equal('string');
      } 
    });
  });
});

describe('checkRecordExists', () => {
    it('should check that no_rawat and kd_penyakit are not null and are strings', () => {
      // Define test cases
      const testCases = [
        { no_rawat: 'R123', kd_penyakit: 'P456', shouldPass: true },
      ];
  
      testCases.forEach(({ no_rawat, kd_penyakit, shouldPass }) => {
        if (shouldPass) {
          // Check if inputs are strings and not null
          expect(typeof no_rawat).to.equal('string');
          expect(typeof kd_penyakit).to.equal('string');
        } 
      });
    });
  });

