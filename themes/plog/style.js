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
        transition: opacity .3s ease-in-out, transform .4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        will-change: transform;
    }
    #theme-plog #posts-wrapper article img.lazy-image-placeholder{
        opacity: 0;
    }

    /* 卡片悬浮动画：图片平滑放大 + 阴影加深
       仅使用 transform/box-shadow(GPU 合成层)，不触发回流，无布局抖动 */
    #theme-plog #posts-wrapper article{
        transition: box-shadow .4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    #theme-plog #posts-wrapper article:hover{
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.22);
    }
    #theme-plog #posts-wrapper article:hover img:not(.lazy-image-placeholder){
        transform: scale(1.05);
    }
    /* 触屏设备无 hover，动画不触发，点按行为不受影响 */
    @media (prefers-reduced-motion: reduce){
        #theme-plog #posts-wrapper article,
        #theme-plog #posts-wrapper article img{
            transition: none;
        }
        #theme-plog #posts-wrapper article:hover img{
            transform: none;
        }
    }

      ${themeConsoleStyle('plog', CONFIG)}
  `}</style>
}

export { Style }
