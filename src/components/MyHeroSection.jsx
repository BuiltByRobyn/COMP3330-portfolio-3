import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function MyHero() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-8 p-6 md:p-8">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/20">
              <Image
                src="/profile.jpg"
                alt="Profile photo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="w-full md:w-2/3 flex flex-col gap-4 text-center md:text-left">
            <CardHeader className="p-0">
              <CardTitle className="text-4xl md:text-5xl font-bold mb-2">
                Hi, I'm Robyn
              </CardTitle>
              <CardDescription className="text-lg md:text-xl">
                Full Stack Web Developer
                <br />
                CSPO, CSM, PSM, ACP, CAPM
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                After years working in management, I went back to BCIT in 2024 to learn full-stack development. Now I write code that solves problems and build apps that matter, bringing real-world project experience to every line I write.

              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-4">
                Explore my projects below to see what I've been working on, or check out my resume to learn more
                about my experience and skills.
              </p>
            </CardContent>
          </div>
        </div>
      </Card>
    </section>
  )
}
