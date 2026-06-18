// .eslintrc.js
module.exports = {
	rules: {
		'no-restricted-properties': [
			'error',
			{
				object: 'process',
				property: 'env',
				message: 'Use validated env from env.ts instead of process.env',
			},
		],
	},
	// overrides: [
	// 	{
	// 		files: ['src/env.ts'], // allow here
	// 		rules: {
	// 			'no-restricted-properties': 'off',
	// 		},
	// 	},
	// ],
};
