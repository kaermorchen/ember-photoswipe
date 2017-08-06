/* eslint-env node */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-photoswipe',

  included: function(app) {
    this._super.included.apply(this, arguments);

    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import(`${app.bowerDirectory}/photoswipe/dist/photoswipe.js`);
      app.import(`${app.bowerDirectory}/photoswipe/dist/photoswipe-ui-default.js`);
    }
  },

  treeForStyles: function treeForStyles(tree) {
    var styleTrees = [];

    if (this.app.project.findAddonByName('ember-cli-sass')) {
      var sassTree = new Funnel(path.join(this.app.bowerDirectory, 'photoswipe', 'src', 'css'), {
        destDir: 'ember-photoswipe'
      });

      styleTrees.push(sassTree);
    }

    if (tree) {
      styleTrees.push(tree);
    }

    return mergeTrees(styleTrees, { overwrite: true });
  },

  treeForPublic: function() {
    var defaultSkinPath = path.join(this.app.bowerDirectory, 'photoswipe', 'dist', 'default-skin');

    var publicTree = new Funnel(this.treeGenerator(defaultSkinPath), {
      srcDir: '/',
      destDir: '/assets/images',
      exclude: ['default-skin.css']
    });

    return publicTree;
  }
};
