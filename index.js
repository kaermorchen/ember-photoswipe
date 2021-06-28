'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');

module.exports = {
  name: require('./package').name,

  included() {
    this._super.included.apply(this, arguments);
    this._ensureFindHost();

    const host = this._findHost();
    const psDir = host.bowerDirectory + '/photoswipe';

    if (!process.env.EMBER_CLI_FASTBOOT) {
      host.import(psDir + '/dist/photoswipe.css');
      host.import(psDir + '/dist/default-skin/default-skin.css');
      host.import(psDir + '/dist/photoswipe.js');
      host.import(psDir + '/dist/photoswipe-ui-default.min.js');
    }
  },

  treeForPublic() {
    const host = this._findHost();
    const defaultSkinPath = path.join(host.bowerDirectory, 'photoswipe', 'dist', 'default-skin');
    const publicTree = new Funnel(this.treeGenerator(defaultSkinPath), {
      srcDir: '/',
      destDir: '/assets',
      exclude: ['default-skin.css']
    });

    return publicTree;
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
  }
};
