import Image from 'next/image'

import PreviewCard from '@/components/PreviewCard'

interface DemoItem {
  title?: string
  titleColor?: string
  image?: string
  href: string
}

const demos: DemoItem[] = [
  {
    title: 'Waves',
    titleColor: '#eae6cd',
    href: '/designs/waves',
    image: 'waves-1.svg',
  },
]

export default function Home() {
  return (
    <div className="container max-w-screen-sm mx-auto">
      <section className="pt-8">
        <h1 className="text-4xl font-medium text-stone-700 mb-1">Squiggle</h1>
        <h2 className="text-2xl text-stone-400">
          A collection of customizable designs
        </h2>
      </section>

      <main className="py-16 px-8 md:px-16 lg:px-0 grid gap-4 grid-cols-1">
        {demos.map((demo) => (
          <PreviewCard
            key={demo.href}
            title={demo.title}
            textColor={demo.titleColor}
            href={demo.href}
          >
            <Image
              className="h-full"
              src={`/demo/${demo.image}`}
              alt={`${demo.title} preview`}
              width={800}
              height={300}
            />
          </PreviewCard>
        ))}
      </main>
    </div>
  )
}
