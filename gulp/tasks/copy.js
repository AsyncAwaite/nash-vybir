export const copy = () => {
	return app.gulp.src(app.path.src.files)
		.pipe(app.gulp.dest(app.path.build.files))
}

export const copyIcons = () => {
	return app.gulp.src(app.path.src.icons)
		.pipe(app.gulp.dest(app.path.build.icons))
}