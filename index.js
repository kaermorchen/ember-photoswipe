'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const fastbootTransform = require('fastboot-transform');
const resolve = require('resolve');

module.exports = {
  name: require('./package').name,

  included() {
    this._super.included.apply(this, arguments);
    this._ensureFindHost();

    const vendorPath = `vendor/${this.name}`;
    const host = this._findHost();

    host.import({
      development: path.join(vendorPath, 'photoswipe.js'),
      production: path.join(vendorPath, 'photoswipe.min.js'),
    });

    host.import({
      development: path.join(vendorPath, 'photoswipe-ui-default.js'),
      production: path.join(vendorPath, 'photoswipe-ui-default.min.js'),
    });
  },

  treeForVendor() {
    const photoswipePath = path.join(
      this.resolvePackagePath('photoswipe'),
      'dist'
    );
    const photoswipeFiles = fastbootTransform(
      new Funnel(photoswipePath, {
        files: [
          'photoswipe.js',
          'photoswipe.min.js',
          'photoswipe-ui-default.js',
          'photoswipe-ui-default.min.js',
        ],
        destDir: this.name,
      })
    );

    return photoswipeFiles;
  },

  treeForStyles(tree) {
    const styleTrees = [];
    const host = this._findHost();

    if (host.project.findAddonByName('ember-cli-sass')) {
      styleTrees.push(
        new Funnel(
          path.join(this.resolvePackagePath('photoswipe'), 'src', 'css'),
          {
            destDir: this.name,
          }
        )
      );
    }

    if (tree) {
      styleTrees.push(tree);
    }

    return mergeTrees(styleTrees, { overwrite: true });
  },

  treeForPublic() {
    const defaultSkinPath = path.join(
      this.resolvePackagePath('photoswipe'),
      'dist',
      'default-skin'
    );
    const publicTree = new Funnel(defaultSkinPath, {
      destDir: '/assets/images',
      exclude: ['default-skin.css'],
    });

    return publicTree;
  },

  resolvePackagePath(packageName) {
    return path.dirname(
      resolve.sync(`${packageName}/package.json`, {
        basedir: this.app.project.root,
      })
    );
  },

  _ensureFindHost() {
    if (!this._findHost) {
      this._findHost = function findHostShim() {
        let current = this;
        let app;

        do {
          app = current.app || app;
        } while (current.parent.parent && (current = current.parent));

        return app;
      };
    }
  },
};
