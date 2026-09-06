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
        transition: opacity .3s ease-in-out,
                    scale .4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                    filter .5s ease;
        will-change: transform;
        /* 图片常驻彩色，保留轻微对比度增强 */
        filter: contrast(1.2);
        /* Ken Burns 慢速推拉(transform 关键帧，与 scale 属性独立复合，互不冲突) */
        animation: plog-kenburns 24s ease-in-out infinite alternate;
    }
    #theme-plog #posts-wrapper article img.lazy-image-placeholder{
        opacity: 0;
    }
    @keyframes plog-kenburns{
        from{ transform: scale(1) translate(0, 0); }
        to  { transform: scale(1.08) translate(-1.5%, 1.5%); }
    }

    /* 悬浮文字遮罩：底部渐变层 + 标题/日期，悬浮时浮现 */
    #theme-plog .plog-card-overlay{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 1rem;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0));
        opacity: 0;
        transform: translateY(10px);
        transition: opacity .35s ease, transform .35s ease;
        pointer-events: none;
    }
    #theme-plog #posts-wrapper article:hover .plog-card-overlay{
        opacity: 1;
        transform: translateY(0);
    }
    /* 触屏设备无 hover：遮罩常驻显示，保证信息可访问 */
    @media (hover: none){
        #theme-plog .plog-card-overlay{
            opacity: 1;
            transform: none;
        }
    }

    /* 卡片悬浮动画：图片平滑放大 + 阴影加深
       放大用独立 scale 属性(与 Ken Burns 的 transform 动画复合)，
       全部走合成层属性，不触发回流，无布局抖动 */
    #theme-plog #posts-wrapper article{
        transition: box-shadow .4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    #theme-plog #posts-wrapper article:hover{
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.22);
    }
    #theme-plog #posts-wrapper article:hover img:not(.lazy-image-placeholder){
        scale: 1.05;
        filter: contrast(1.2);
    }
    @media (prefers-reduced-motion: reduce){
        #theme-plog #posts-wrapper article,
        #theme-plog #posts-wrapper article img,
        #theme-plog .plog-card-overlay{
            transition: none;
            animation: none;
        }
        #theme-plog #posts-wrapper article:hover img{
            scale: none;
        }
        #theme-plog .plog-card-overlay{
            opacity: 1;
            transform: none;
        }
    }

      ${themeConsoleStyle('plog', CONFIG)}
  `}</style>
}

export { Style }
