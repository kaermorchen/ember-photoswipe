module.exports = {
  normalizeEntityName(entityName) {
    return entityName || "ember-photoswipe";
  },

  afterInstall() {
    return this.addPackagesToProject([
      { name: 'photoswipe', target: '^4.1.2' }
    ]);
  }
};
