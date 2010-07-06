var t = new Tester(jQuery('#results'));

// helpers for brevity
var url = function(str) { return new JSUrl(str); };
var toStr = function(str) { return url(str).toString(); };
var param = function(str, key) { return url(str).getParameter(key); };
var prepend = function(str, key, value) { return url(str).prependParameter(key, value).toString(); };
var rt = function(url) { t.assertEqual(toStr(url), url, 'round trip'); };
var eq = function(a, b, message) { t.assertEqual(a, b, message); };

t.heading('miscellaneous');
if (!JSUrl.current().getParameter('go'))
	JSUrl.current().prependParameter('go', 'true').go();
eq(JSUrl.current().getParameter('go'), 'true', 'go() seems to work');
eq(JSUrl.current().toString(), window.location.href, 'JSUrl.current()');
eq(JSUrl.fromString('http://example.org/').toString(), 'http://example.org/', 'fromString');

t.heading('URL round trips');
rt('http://x.yz/');
rt('https://x.yz/');
rt('https://x.yz:8080/');
rt('http://x.yz/?a');
rt('http://x.yz/?a=b');
rt('http://x.yz/?a=b&c=d');
rt('http://x.yz/?');
rt('http://x.yz/#');
rt('http://x.yz/#fragment');
rt('http://x.yz/?#');
rt('http://x.yz/?#fragment');
rt('http://x.yz/?a=b&c=d#');
rt('http://x.yz/?a=b&c=d#fragment');

t.heading('parameter access');
eq(param('http://x.yz/?a=test', 'a'), 'test', 'simple param a=test');
eq(param('http://x.yz/?a=b+c&d=e', 'a'), 'b c', 'multi param a=b+c&d=e');
eq(param('http://x.yz/?a=b+c&d=e', 'd'), 'e', 'second param access a=b+c&d=e');
eq(param('http://x.yz/', 'a'), null, 'missing parameter');

t.heading('parameter prepending');
eq(prepend('http://x.yz/', 'x', 'z'), 'http://x.yz/?x=z');
eq(prepend('http://x.yz/?a=b&c=d', 'x', 'z'), 'http://x.yz/?x=z&a=b&c=d');
eq(prepend('http://x.yz/', 'a b', 'c d'), 'http://x.yz/?a%20b=c%20d');
eq(prepend('http://x.yz/?a=', 'a', 'b'), 'http://x.yz/?a=b');
eq(prepend('http://x.yz/?a=&c=d', 'a', 'b'), 'http://x.yz/?a=b&c=d');
eq(prepend('http://x.yz/?a=&c=d#frag', 'a', 'b'), 'http://x.yz/?a=b&c=d#frag');

t.summary();