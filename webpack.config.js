const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //自动创建html文件
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清除多余文件

module.exports = {
  devtool:'cheap-mudule-eval-source-map',// 用于开发调试，方便清楚那个文件出错
  entry:{
    index:'./src/index.js'
  },
  output:{
    filename:'[name].js', //输出的文件名
    path:path.resolve(__dirname,'dist')
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module:{
    rules:[
      { //转换css文件
        test:/\.css$/,
        use:['css-loader']
      },
      { test: /\.tsx?$/, loader: "ts-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      { //转换less文件
        test:/\.less$/,
        use:['style-loader','css-loader','less-loader'] //加载顺序从右到左
      },
      { // 转换图片文件
        test:/\.(png|svg|jpg|gif)$/,
        use:['file-loader']
      },
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        // use:['babel-loader']
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            // presets: ['@babel/preset-env'],
            // plugins: [require('@babel/plugin-transform-object-rest-spread')]
          }
        }
      },
    ],
    
  },
  // 开启一个虚拟服务器
  devServer: {						//webpack-server配置（仅开发环境需要）
    host: 'localhost',			//host设置 0.0.0.0 可供外部访问
    port: 8081,			//端口设置
    contentBase: path.join(__dirname, './dist'), //虚拟存储路径，开发环境放在内存
    publicPath: '/',
    // proxy: config.dev.proxyTable,	//代理列表
    historyApiFallback: true,		//开启history模式,否则无法跳转到对应的路由
    disableHostCheck: true,			//关闭host检查
    compress: true,					//启动压缩
    hot:true,						//热加载
    open:true,
  },
  plugins:[
    //每次编译都会把dist文件下的文件清除，我们可以在合适的时候打开这行代码，加入我们打包的时候，开发过程中最好关闭这行代码
    // new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      //使用一个模板
      template:'src/index.html'
    }),
    new webpack.DefinePlugin({  //环境变量装配
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
				NODE_APIENV: JSON.stringify(process.env.NODE_APIENV || 'development'),
			},
		}),
  ]
}