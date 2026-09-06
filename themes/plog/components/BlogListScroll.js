import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useCallback, useEffect, useRef, useState } from 'react'
import BlogPost from './BlogPost'

/**
 * 照片卡片列表：滚动到底自动加载更多(无分页)
 * 与首页一致的瀑布流布局，保留全部卡片动画
 * @param {*} props
 * @returns
 */
export const BlogListScroll = props => {
  const { posts } = props
  const { locale } = useGlobal()
  const [page, updatePage] = useState(1)

  const perPage = parseInt(
    siteConfig('POSTS_PER_PAGE', 12, props?.NOTION_CONFIG)
  )
  const postsToShow = posts ? posts.slice(0, perPage * page) : []
  const hasMore = posts ? page * perPage < posts.length : false

  const handleGetMore = useCallback(() => {
    if (!hasMore) return
    updatePage(p => p + 1)
  }, [hasMore])

  // 哨兵元素：进入视口前 600px 即预加载下一批，滚动无感
  // 依赖 page：每加载一批后重新 observe，使哨兵若仍在视口内可继续触发，
  // 否则越过预载区后只触发一次，会导致后续文章不再加载
  const sentinelRef = useRef(null)
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            handleGetMore()
          }
        })
      },
      { rootMargin: '600px' }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [page, handleGetMore])

  // 新卡片渲染后刷新 AOS，让追加的卡片也有入场动画
  useEffect(() => {
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.refreshHard()
    }
  }, [postsToShow.length])

  return (
    <div className='w-full'>
      <div
        id='posts-wrapper'
        className='columns-2 md:columns-3 lg:columns-4 2xl:columns-5 gap-4'>
        {postsToShow.map((post, index) => (
          <BlogPost index={index} key={post.id} post={post} {...props} />
        ))}
      </div>

      {/* 加载哨兵 + 兜底点击加载 */}
      <div
        ref={sentinelRef}
        onClick={handleGetMore}
        className='w-full my-4 py-4 text-center cursor-pointer text-sm text-gray-400'>
        {hasMore ? locale.COMMON.MORE : `${locale.COMMON.NO_MORE} 😰`}
      </div>
    </div>
  )
}
