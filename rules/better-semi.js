const semi = require('@typescript-eslint/eslint-plugin/dist/rules/semi').default;
const {AST_NODE_TYPES} = require('@typescript-eslint/experimental-utils');


const newSemi = {
	...semi,
	name: 'better-semi'
};

newSemi.create = (context) => {
	const r = semi.create(context);

	const originalClassProperty = r[AST_NODE_TYPES.ClassProperty];
	r[AST_NODE_TYPES.ClassProperty] = (node, ...args) => {
		if (node && node.value && node.value.type === AST_NODE_TYPES.ArrowFunctionExpression) {
			return;
		} else {
			originalClassProperty(node, ...args);
		};
	};

	return r;
};


module.exports = newSemi;
