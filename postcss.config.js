import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  plugins: [
    postcssPresetEnv({
      stage: 1,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'color-function': true,
      },
    }),
    autoprefixer,
    isProduction && cssnano({
      preset: 'default',
    }),
  ].filter(Boolean),
};

export default config;
