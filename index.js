/* eslint-env node */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-photoswipe',

  options: {
    nodeAssets: {
      photoswipe: {
        srcDir: 'dist',
        import: {
          include: ['photoswipe.js', 'photoswipe-ui-default.js']
        }
      }
    }
  },

  treeForStyles: function treeForStyles(tree) {
    var styleTrees = [];

    if (this.app.project.findAddonByName('ember-cli-sass')) {
      var sassTree = new Funnel(path.join('node_modules', 'photoswipe', 'src', 'css'), {
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
    var defaultSkinPath = path.join('node_modules', 'photoswipe', 'dist', 'default-skin');

    var publicTree = new Funnel(this.treeGenerator(defaultSkinPath), {
      srcDir: '/',
      destDir: '/assets/images',
      exclude: ['default-skin.css']
    });

    return publicTree;
  }
};
