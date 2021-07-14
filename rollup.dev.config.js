import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import serve from 'rollup-plugin-serve'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    postcss(),
    typescript({
      include: ['src/**/*.ts'],
    }),
    serve({
      open: true,
      historyApiFallback: '/',
      port: 8080
    })
  ],
}
