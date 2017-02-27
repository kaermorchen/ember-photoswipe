module.exports = {
  normalizeEntityName: function (entityName) {
    return entityName || "ember-photoswipe";
  },

  afterInstall: function() {
    return this.addBowerPackageToProject('photoswipe', '^4.1.1');
  }
};
