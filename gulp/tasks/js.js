import webpack from "webpack-stream";

export const js = () => {
  return app.gulp
    .src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "JS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      webpack({
        mode: app.isBuild ? "production" : "development",
        output: {
          filename: "app.min.js",
        },
        watch: false,
        devtool: "source-map",
        module: {
          rules: [
            {
              			test: /\.m?js$/,
              			exclude: /(node_modules|bower_components)/,
              			use: {
              				loader: "babel-loader",
              				options: {
              					presets: [
              						[
              							"@babel/preset-env",
              							{
              								debug: true,
              								corejs: 3,
              								useBuiltIns: "usage",
              							},
              						],
              					],
              				},
              			},

            },
          ],
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream());
};
