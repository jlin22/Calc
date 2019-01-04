function performOperation(x, y, op) {
	if (op == "+")
		return x + y
	else if (op == "-")
		return x - y
	else if (op == "*")
		return x * y
	else if (op == "/")
		return x / y
}

function testPerformOperation() {
	console.log("2+3=" + performOperation(2, 3, "+"));
	console.log("3-2=" + performOperation(3, 2, "-"));
	console.log("2*3=" + performOperation(2, 3, "*"));
	console.log("4/2=" + performOperation(4, 2, "/"));
}

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
	console.log(tokens);
	var operators = [];
	var operands = [];
	var opRe = /[(+-/*]/;
	for (var i = 0; i < tokens.length; i++) {
		console.log(i, operators, operands);
		if (opRe.test(tokens[i]))
			operators.push(tokens[i]);
		else if (tokens[i] == ")") {
			while (operators[operators.length - 1] != "(") {
				var temp = operands.pop();
				operands.push(performOperation(operands.pop(), temp, operators.pop()));
			}
		}
		else	
			operands.push(parseInt(tokens[i]))
	}
	while (operators.length != 0) {
		console.log(operators, operands);
		if (operators[operators.length - 1] == "(")
			operators.pop();
		else{
			var temp = operands.pop();
			operands.push(performOperation(operands.pop(), temp, operators.pop()));
		}
	}
	return operands.pop();
}

function testEvaluate() {
	console.log(evaluate("2 + 4"));
	console.log(evaluate("2 + (5 * 3)"));
	console.log(evaluate("2 + (5 + (4 * 3))"));
	console.log(evaluate("(2)"));
}

function testEverything() {
	testPerformOperation();
	testParseExpression();
	testEvaluate();
}

testEverything();
