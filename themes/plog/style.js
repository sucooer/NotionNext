/* eslint-disable react/no-unknown-property */
import CONFIG from './config'
import { themeConsoleStyle } from '@/lib/themeConsoleStyle'
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return <style jsx global>{`
    // 底色
    .dark body{
        background-color: black;
    }

    // 瀑布流卡片：图片加载前占位底色，避免闪烁与突兀空白
    #theme-plog #posts-wrapper article{
        background-color: #f3f4f6;
    }
    .dark #theme-plog #posts-wrapper article{
        background-color: #111827;
    }
    #theme-plog #posts-wrapper article img{
        display: block;
        transition: opacity .3s ease-in-out;
    }
    #theme-plog #posts-wrapper article img.lazy-image-placeholder{
        opacity: 0;
    }

      ${themeConsoleStyle('plog', CONFIG)}
  `}</style>
}

export { Style }
