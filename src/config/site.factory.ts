import type { SiteFactoryRecipe } from '@/design/factory/types'

export const SITE_FACTORY_RECIPE: SiteFactoryRecipe = {
  brandPack: 'studio-dark',
  navbar: 'floating-bar',
  footer: 'dense-footer',
  homeLayout: 'image-profile-home',
  motionPack: 'studio-stagger',
  primaryTask: 'article',
  enabledTasks: ['article', 'profile'],
  taskLayouts: {
    article: 'article-editorial',
    profile: 'profile-business',
  },
}
