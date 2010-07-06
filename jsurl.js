/**
 * Basic JavaScript URL encapsulation.
 * Functionality & robustness to be added as needed.
 * @author Paul Annesley
 * @licence MIT Open Source
 * @home http://github.com/pda/jsurl
 */

var JSUrl = function(url) {

	// http://www.ietf.org/rfc/rfc2396.txt (Appendix B)
	var rx = new RegExp('^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?');
	var match = rx.exec(url);

	this.scheme = match[2];
	this.host = match[4];
	this.path = match[5];
	this.queryWithSeparator = match[6] ? match[6].replace('+', ' ') : null;
	this.query = match[7] ? match[7].replace('+', ' ') : null;
	this.fragmentWithHash = match[8];
	this.fragment = match[9];
	this.parameters = this.parseQuery(this.query);
};

JSUrl.current = function() { return new JSUrl(window.location.href); };
JSUrl.fromString = function(url) { return new JSUrl(url); };

JSUrl.prototype = {

	getParameter: function(key) {
		var value = this.parameters[key];
		return typeof(value) == 'undefined' ? null : value;
	},

	prependParameter: function(key, value) {
		var newPair = encodeURIComponent(key) + '=' + encodeURIComponent(value);
		if (this.query) this.query = this.query.replace(new RegExp(key+'=[^&#]*&?'), '');
		this.query = this.query ? newPair + '&' + this.query : newPair;
		this.queryWithSeparator = '?' + this.query;
		return this;
	},

	toString: function() {
		var url = this.scheme + '://' + this.host + this.path;
		if (this.queryWithSeparator) url += this.queryWithSeparator;
		if (this.fragmentWithHash) url += this.fragmentWithHash;
		return url;
	},

	parseQuery: function(query) {
		if (!query) return {};

		var args = query.split('&'),
			result = {};

		// thanks to http://adamv.com/dev/javascript/files/querystring.js
		for (var i = 0; i < args.length; i++) {
			var pair = args[i].split('=');
			var key = decodeURIComponent(pair[0]);
			var value = (pair.length==2) ? decodeURIComponent(pair[1]) : key;
			result[key] = value;
		}
		return result;
	},

	go: function() {
		window.location.href = this.toString();
		return this;
	}
};
