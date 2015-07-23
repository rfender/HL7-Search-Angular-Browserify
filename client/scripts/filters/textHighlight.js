/**
 * This filter runs a global, case-insensitive RegExp on the text using the passed in 'phrase'
 * and replaces that matched string with a span styled with the highlight class.
 */

'use strict';

exports.inject = function(app) {
  app.filter('highlight', exports.filter);
  return exports.filter;
};

exports.filter = function($sce) {
  return function(text, phrase) {
    if (phrase) {
      text = text.replace(new RegExp('('+phrase+')', 'gi'), '<span class="highlight">$1</span>');
    }

    return $sce.trustAsHtml(text)
  };
};