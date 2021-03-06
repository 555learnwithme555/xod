import { assert } from 'chai';
import fs from 'fs';
import path from 'path';
import { removeSync } from 'fs-extra';

import { Backup } from '../src/backup';
import { readDir } from '../src/read';
import { writeJSON } from '../src/write';

describe('Backup', () => {
  const projectPath = path.resolve(
    __dirname,
    './fixtures/workspace/awesome-project/'
  );
  const tempPath = path.resolve(__dirname, './.tmp/');
  const backup = new Backup(projectPath, tempPath);

  const restoreTmpDir = path.resolve(__dirname, './fs-temp/');

  before(() => removeSync(restoreTmpDir));
  after(() => removeSync(restoreTmpDir));

  it('make() should create .tmp directory and copy files into it', done => {
    backup
      .make()
      .then(() => readDir(tempPath))
      .then(files => {
        assert.lengthOf(files, 7);
        done();
      })
      .catch(err => done(err));
  });

  it('clear() should remove .tmp directory', done => {
    backup.clear();
    assert(fs.existsSync(tempPath) === false);
    done();
  });

  it('restore() should restore data from .tmp', done => {
    const data = {
      dirname: './test/',
      filename: 'test.json',
      content: true,
    };

    const dirpath = path.resolve(restoreTmpDir, data.dirname);
    const filepath = path.resolve(dirpath, data.filename);
    const temppath = path.resolve(restoreTmpDir, './.tmp/');
    let rBackup;

    writeJSON(filepath, data)
      .then(() => {
        rBackup = new Backup(dirpath, temppath);
      })
      .then(() => rBackup.make())
      .then(() => readDir(temppath))
      .then(files => {
        assert.lengthOf(files, 1);
      })
      .then(() => fs.renameSync(filepath, `${filepath}_broken`))
      .then(() => rBackup.restore())
      .then(() => readDir(dirpath))
      .then(files => {
        assert.deepEqual(files, [filepath]);
        done();
      })
      .catch(err => done(err));
  });
});
