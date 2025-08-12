import { ContentGenerator } from '@/components/content-generator';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
          Skapa Instagram-inlägg med AI
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Ge oss en enkel beskrivning så förvandlar vår AI den till en engagerande text för Instagram, komplett med emojis och hashtags.
        </p>
      </div>
      <div className="mt-12">
        <ContentGenerator />
      </div>
    </div>
  );
}
