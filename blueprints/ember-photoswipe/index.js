module.exports = {
  normalizeEntityName: function (entityName) {
    return entityName || "ember-photoswipe";
  },

  afterInstall: function () {
    return this.addPackagesToProject([
      { name: 'photoswipe', target: '^4.1.2' }
    ]);
  }
};
