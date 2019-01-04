function parseExpression(expression) {
	var tokens = [];
	var inSpace = false;
	var start = 0;	
	var singleRegExp = /[+-/*()]/;
	for (var i = 0; i < expression.length; i++) {
		if (inSpace && singleRegExp.test(expression.charAt(i))) {
			tokens.push(expression.charAt(i));
			start = i + 1;
		}
		else if (inSpace && expression.charAt(i) != ' ') {
			inSpace = false;
			start = i;
		}
		else if (!inSpace && singleRegExp.test(expression.charAt(i))) {
			tokens.push(expression.slice(start, i));
			tokens.push(expression.charAt(i));
			start = i + 1;
		}
		else if (!inSpace && expression.charAt(i) == ' ') {
			inSpace = true;
			tokens.push(expression.slice(start, i));
		}
	}
	if (!inSpace && !singleRegExp.test(expression.charAt(i - 1)))
		tokens.push(expression.slice(start, i));
	return tokens;
}

function testParseExpression() {
	console.log(parseExpression("2 + 4"));
	console.log(parseExpression("2 + ( 5 + 3 )"));
	console.log(parseExpression("2 + (5+3)"));
}

function evaluate(expression) {
	var tokens = parseExpression(expression);
	var operators = [];
	var operands = [];
	var opRe = /[+-/*]/;
	for (var i = 0; i < tokens.length; i++) {
		if (opRe.test(tokens[i]))
			operators.push(tokens[i]);
		else if (tokens[i] == ")") {
			var temp = operands.pop();
		}
		else	
			operands.push(tokens[i])
	}
}

function testEvaluate() {
	console.log(evaluate("2 + 4"));
}

function testEverything() {
	testParseExpression();
	testEvaluate();
}

testEverything();
