const path = require('path');
const webpack = require('webpack');

console.log(__dirname);

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	devtool: 'inline-source-map',
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: ['babel-loader']
		}, {
			test: /\.(ts|tsx)$/,
			exclude: /node_modules/,
			loader: 'awesome-typescript-loader'
		}, {
			enforce: 'pre',
			test: /\.js$/,
			loader: 'source-map-loader'
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
			]
		}, {
			test: /\.(ts|tsx)$/,
			exclude: /node_modules/,
			enforce: 'pre',
			use: [{
				loader: 'tslint-loader'
			}]
		}, {
			test: /\.(jpe?g|png|gif)$/i,
			loader:"file-loader",
			options:{
				name:'[name].[ext]',
				outputPath:'assets/images/'
				//the images will be emited to dist/assets/images/ folder
			}
		  }]
	},
	resolve: {
		extensions: [
			".tsx",
			".ts",
			".js"
		]
	},
	devServer: {
		contentBase: './dist'
	},
	plugins: [
	  /* Use the ProvidePlugin constructor to inject jquery implicit globals */
	  new webpack.ProvidePlugin({
		  $: "jquery",
		  jQuery: "jquery",
		  "window.jQuery": "jquery'",
		  "window.$": "jquery"
	  })
	]
	// externals: {
    //     react: 'React',
    //     'react-dom': 'ReactDOM'
    // }
};