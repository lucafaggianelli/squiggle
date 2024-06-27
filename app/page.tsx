import PreviewCard from '@/components/PreviewCard'
import Image from 'next/image'

interface DemoItem {
  id: string
  title?: string
  titleColor?: string
  image?: JSX.Element
}

const demos: DemoItem[] = [
  {
    id: 'waves-1',
    title: 'Fresh coffee',
    titleColor: '#eae6cd',
  },
  {
    id: 'waves-2',
    title: '7x Sardines',
    titleColor: '#f6f6f6',
  },
  {
    id: 'waves-3',
    title: 'Subscribe',
    titleColor: '#f6f6f6',
  },
  {
    id: 'waves-text',
    image: (
      <h2 className="text-7xl font-serif text-stone-600 text-center">Waves</h2>
    ),
  },
  {
    id: 'waves-5',
    title: 'Happy hour',
    titleColor: 'white',
  },
  {
    id: 'waves-4',
    title: 'Book a demo',
    titleColor: '#9f1cd8',
  },
]

export default function Home() {
  return (
    <main className="container max-w-screen-lg mx-auto py-16 px-8 md:px-16 lg:px-0 grid gap-4 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
      {demos.map((demo) => (
        <PreviewCard
          key={demo.id}
          title={demo.title}
          textColor={demo.titleColor}
        >
          {demo.image ? (
            demo.image
          ) : (
            <img className="h-full" src={`/demo/${demo.id}.svg`} alt={''} />
          )}
        </PreviewCard>
      ))}
    </main>
  )
}
