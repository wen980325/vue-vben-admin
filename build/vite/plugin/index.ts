import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import purgeIcons from 'vite-plugin-purge-icons'
import windiCSS from 'vite-plugin-windicss'
import VitePluginCertificate from 'vite-plugin-mkcert'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
//import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { configHtmlPlugin } from './html'
import { configPwaConfig } from './pwa'
import { configCompressPlugin } from './compress'
import { configStyleImportPlugin } from './styleImport'
import { configVisualizerConfig } from './visualizer'
import { configThemePlugin } from './theme'
import { configImageminPlugin } from './imagemin'
import { configSvgIconsPlugin } from './svgSprite'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
    // support name
    //vueSetupExtend(),
    VitePluginCertificate({
      source: 'coding',
    }),
    Components({
      resolvers: [AntDesignVueResolver()],
      // globs: ['src/components/**/index.vue'], // 会导致index.vue生成的类型声明为Undefined
    }),
    // 自动导入api
    AutoImport({
      imports: ['vue', 'vue-router'],
      // 设置为在'src/'目录下生成解决ts报错，默认是当前目录('./'，即根目录)
      dts: 'src/auto-import.d.ts',
      // 自动生成'eslintrc-auto-import.json'文件，在'.eslintrc.cjs'的'extends'中引入解决报错
      // 'vue-global-api'这个插件仅仅解决vue3 hook报错
      eslintrc: {
        enabled: true,
      },
    }),
  ]

  // vite-plugin-windicss
  vitePlugins.push(windiCSS())

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy())

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild))

  // vite-plugin-purge-icons
  vitePlugins.push(purgeIcons())

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin(isBuild))

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig())

  // vite-plugin-theme
  vitePlugins.push(configThemePlugin(isBuild))

  // The following plugins only work in the production environment
  if (isBuild) {
    // vite-plugin-imagemin
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin())

    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    )

    // vite-plugin-pwa
    vitePlugins.push(configPwaConfig(viteEnv))
  }

  return vitePlugins
}
