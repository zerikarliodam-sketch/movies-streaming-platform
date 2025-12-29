import React from 'react'
import { Metadata } from 'next'

import { getPopularMovies } from '@/services/movies'
import { siteConfig } from '@/config/site'
import { QUERY_KEYS } from '@/lib/queryKeys'
import { MediaContent } from '@/components/media/media-content'

try {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const url = new URL("/tv-shows", base);
  // use url...
} catch (e) {
  // handle gracefully for build-time
}
// ======================
// OG IMAGE URL GENERATOR
// ======================
const generateOgImageUrl = (title: string, description: string) =>
  `${baseUrl}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

// ======================
// METADATA
// ======================
export const metadata: Metadata = {
  title: 'Movies',
  description:
    'Discover and explore popular movies, trending releases, and all-time favorites.',

  // ❗ MUHIM: metadataBase faqat ROOT URL bo‘ladi
  metadataBase: new URL(baseUrl),

  openGraph: {
    title: 'Movies - ' + siteConfig.name,
    description:
      'Discover and explore popular movies, trending releases, and all-time favorites.',
    url: '/movies',
    images: [
      {
        url: generateOgImageUrl(
          'Movies',
          'Discover and explore popular movies'
        ),
        width: siteConfig.openGraph.images.default.width,
        height: siteConfig.openGraph.images.default.height,
        alt: 'Movies - ' + siteConfig.name,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Movies - ' + siteConfig.name,
    description:
      'Discover and explore popular movies, trending releases, and all-time favorites.',
    images: [
      generateOgImageUrl(
        'Movies',
        'Discover and explore popular movies'
      ),
    ],
  },
}

// ======================
// PAGE COMPONENT
// ======================
async function Movies() {
  const movies = await getPopularMovies()

  return (
    <section className="container h-full py-20 lg:py-36">
      <MediaContent
        media={movies}
        getPopularMediaAction={getPopularMovies}
        queryKey={QUERY_KEYS.MOVIES_KEY}
        enableFilters={true}
        filterLayout="sidebar"
        title="Movies"
      />
    </section>
  )
}

export default Movies