'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var BroccoliMergeTrees = require('broccoli-merge-trees');
var fastbootTransform = require('fastboot-transform');

module.exports = {
  name: require('./package').name,

  included(app) {
    this._super.included(app);

    var distPath = path.join('node_modules', 'photoswipe', 'dist');
    var importOptions = {
      using: [{
        transformation: 'fastbootShim'
      }]
    };

    app.import({
      development: path.join(distPath, 'photoswipe.js'),
      production: path.join(distPath, 'photoswipe.min.js'),
    }, importOptions);

    app.import({
      development: path.join(distPath, 'photoswipe-ui-default.js'),
      production: path.join(distPath, 'photoswipe-ui-default.min.js'),
    }, importOptions);
  },

  treeForStyles(tree) {
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

    return new BroccoliMergeTrees(styleTrees, { overwrite: true });
  },

  treeForPublic() {
    var defaultSkinPath = path.join('node_modules', 'photoswipe', 'dist', 'default-skin');

    var publicTree = new Funnel(this.treeGenerator(defaultSkinPath), {
      srcDir: '/',
      destDir: '/assets/images',
      exclude: ['default-skin.css']
    });

    return publicTree;
  },

  importTransforms() {
    return {
      fastbootShim: fastbootTransform
    }
  }
};
