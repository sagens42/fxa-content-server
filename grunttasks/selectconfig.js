/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

module.exports = function (grunt) {
  'use strict';

  var path = require('path');

  var CONFIG_ROOT = path.join(__dirname, '..', 'server', 'config');
  var TARGET_TO_CONFIG = {
    app: path.join(CONFIG_ROOT, 'local.json'),
    test: path.join(CONFIG_ROOT, 'local.json'),
    aws: path.join(CONFIG_ROOT, 'awsbox.json'),
    dist: path.join(CONFIG_ROOT, 'production.json')
  };

  grunt.registerTask('selectconfig', function(target) {
    if (! target) {
      target = 'app';
    }

    // Config files specified in CONFIG_FILES env variable override everything
    // else. awsbox instances use this variable to specify ephemeral
    // configuration like public_url.
    if (! process.env.CONFIG_FILES) {
      process.env.CONFIG_FILES = TARGET_TO_CONFIG[target];
    }

    console.log('Using configuration files', process.env.CONFIG_FILES);
  });
};
