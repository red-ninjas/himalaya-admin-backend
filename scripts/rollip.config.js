import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import localResolve from 'rollup-plugin-local-resolve'
import babel from 'rollup-plugin-babel'
import fs from 'fs-extra'
import path from 'path'

const root = path.join(__dirname, '../src')
const componentsPath = path.join(root, 'components')
const distPath = path.join(root, '../dist/framework')
const esmPath = path.join(root, '../dist/esm')

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const plugins = [
  babel({
    exclude: 'node_modules/**',
    extensions,
    presets: [
      [
        'next/babel',
        {
          'styled-jsx': {
            plugins: ['@styled-jsx/plugin-sass'],
          },
        },
      ],
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: [],
    babelrc: false,
    sourcemap: false,
    runtimeHelpers: true,
  }),
  localResolve(),
  nodeResolve({
    browser: true,
    extensions,
  }),
  commonjs(),
]

const globals = {

}


const external = id => /^@nestjs\/core/.test(id)

const cjsOutput = {
  format: 'cjs',
  exports: 'named',
  entryFileNames: '[name]/index.js',
  dir: distPath,
  chunkFileNames: '[name].js',
  globals,
  sourcemap: false,
}

export default (async () => {
  await fs.remove(distPath)
  await fs.remove(esmPath)
  const files = await fs.readdir(componentsPath)

  const components = await Promise.all(
    files.map(async name => {
      const unitPath = path.join(componentsPath, name)
      const entry = path.join(unitPath, 'index.ts')

      const stat = await fs.stat(unitPath)
      if (!stat.isDirectory()) return null

      const hasFile = await fs.pathExists(entry)
      if (!hasFile) return null

      return { name, url: entry }
    }),
  )
  console.log(
    `\n${Object.keys(components).length} Components in total have been collected.`,
  )

  return [
    // Bundle each component separately
    ...components
      .filter(r => !!r)
      .map(({ name, url }) => ({
        input: { [name]: url },
        output: [cjsOutput],
        plugins,
        external,
        onwarn(warning, warn) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
            return
          }
          warn(warning, warning.code)
        },
      })),
    // Bundle for packages containing all components.
    {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return
        }
        warn(warning, warning.code)
      },
      input: { index: path.join(componentsPath, 'index.ts') },
      output: [
        {
          ...cjsOutput,
          entryFileNames: 'index.js',
        },
      ],
      external,
      plugins,
    },
  ]
})()