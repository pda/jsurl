Tester = function(container) {
	this.slate = jQuery(container);
	this.passes = 0;
	this.fails = 0;
};

Tester.prototype = {

	result: function(type, message) {
		this.slate.append(
			'<p class="'+type+'">'+type+': '+message
		);
	},

	pass: function(message) {
		this.passes++;
		this.result('pass', message);
	},

	fail: function(message) {
		this.fails++;
		this.result('fail', message);
	},

	evaluateResult: function(result, message) {
		(result ? this.pass : this.fail).call(this, message);
	},

	assertTrue: function(assertion, message) {
		this.evaluateResult(assertion,
			'assertTrue got ' + (assertion ? 'true' : 'false') + ': ' + message);
	},

	assertFalse: function(assertion, message) {
		this.evaluateResult(!assertion	,
			'assertFalse got ' + (!assertion ? 'false' : 'true') + ': ' + message);
	},

	assertEqual: function(a, b, message) {
		if (!message) message = '';
		var pass = a === b,
			details = '['+a+']' + (pass ? '' : ' and ['+b+']');
		this.evaluateResult(pass, 'assertEqual ' + details + ': ' + message);
	},

	summary: function() {
		var total = this.passes + this.fails;
		this.slate.find('p.summary').remove();
		this.slate.prepend(
			'<p class="summary">' + total + ' tests: ' +
			this.passes + ' passes, ' + this.fails + ' fails.'
		);
	},

	heading: function(heading) {
		this.slate.append('<p class="heading">' + heading);
	},

	trailingComma: false
};
