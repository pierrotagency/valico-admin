module.exports = {
	env: {
		browser: true,
		es2020: true,
	},
	extends: ['plugin:react/recommended', 'airbnb'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 11,
		sourceType: 'module',
	},
	plugins: ['react', 'react-hooks'],
	rules: {
		'no-console': 'off',
		'eslintreact/jsx-indent': 'off',
		'indent': [4, 'tab'],
		'no-tabs': 0,
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		'react-hooks/exhaustive-deps':  'off'
	},
};