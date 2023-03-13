module.exports = {
    plugins: [
     	require('postcss-import'),
        require('postcss-mixins'),
        require("stylelint"),
        require('tailwindcss'),
        require('postcss-preset-env')({ stage: 1 }),
        require('cssnano'),
    ],
}