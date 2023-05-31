// Получаем имя папки проекта
import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`; // Также можно использовать rootFolder
// const buildFolder = `./Applications/MAMP/htdocs`; // Также можно использовать rootFolder
const srcFolder = `./src`;

export const path = {
  build: {
    js: `${buildFolder}/`,
    css: `${buildFolder}/assets/css/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/assets/img/`,
    fonts: `${buildFolder}/assets/fonts/`,
    files: `${buildFolder}/assets/files/`,
    icons: `${buildFolder}/assets/icons/`,
  },
  src: {
    js: `${srcFolder}/js/app.js`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    scss: `${srcFolder}/scss/style.scss`,
    html: `${srcFolder}/*.html`, //.pug
    files: `${srcFolder}/files/**/*.*`,
    icons: `${srcFolder}/icons/**/*.*`,
    svgicons: `${srcFolder}/svgicons/*.svg`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.+(scss|sass|css)`,
    html: `${srcFolder}/**/*.html`, //.pug
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
    files: `${srcFolder}/files/**/*.*`,
    icons: `${srcFolder}/icons/**/*.*`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: ``,
};
