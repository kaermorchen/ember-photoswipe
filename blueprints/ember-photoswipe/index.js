module.exports = {
  normalizeEntityName(entityName) {
    return entityName || "ember-photoswipe";
  },

  afterInstall() {
    return this.addBowerPackageToProject('photoswipe', '^4.1.2');
  },
};
