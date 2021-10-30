const {resolve, join} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');
const PATHS = { src: join(__dirname, 'src')}
module.exports = {
	mode:'development', //development
entry:{index:'./src/index.js',},


	output: {
		filename: '[name].js',
		path:  __dirname+'/build'
},



   module: {
       rules: [
           {
               test: /\.css$/,  // 正则匹配所有.css后缀的样式文件
			   use: [MiniCssExtractPlugin.loader, 'css-loader',"postcss-loader"] // 使用这两个loader来加载样式文件
           },
		   {
			   test:/\.less$/,use:[MiniCssExtractPlugin.loader, 'css-loader','less-loader',"postcss-loader"]
		   },
			{
				test:/\.(png|jpg|gif|jpeg)$/,use:[{
					loader:'url-loader',
					options:{
                        publicPath: './imgss/',
						outputPath:'imgss/',
						limit: 1024 * 8,
						name:'[name][hash:10].[ext]',
						esModule: false,
				},
			},
			]},
			{
                test:/\.html$/,
                loader:'html-loader',
				options:{
					esModule: false,
				}
			},
			            {
			                exclude: /\.(js|json|html|css|less|scss|png|gif|jpg|jpeg)$/,
			
			                loader: 'file-loader',
			                options: {
			                    outputPath: 'font/',
			                    publicPath: './font',
			                    name:'[name][hash:8].[ext]',
								
			                }
			
			            },
			
       ]
   } ,
   
   plugins:[
       new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }), 
		new MiniCssExtractPlugin(),
		new OptimizeCssAssetsWebpackPlugin(),
		new PurgecssPlugin({
		    paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
		}),

	   
   ],
		target: "web",
       devServer: {
           port:3001,
           compress:true,
           open:true,
           hot:true
       },
  }
   
