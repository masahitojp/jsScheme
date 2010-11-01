module("入力");
test("nil tokenize", function () {
	same(tokenize("()"),["(",")"],"nil");
});
	 