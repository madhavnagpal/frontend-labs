import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Star } from "lucide-react";
import { components } from "@/lib/components-data";

const ComponentCard = ({ component }: { component: any }) => {
  const Icon = component.icon;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`${component.gradient} p-3 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon size={24} />
          </div>
        </div>

        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
          {component.title}
        </CardTitle>

        <CardDescription className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {component.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <Button asChild className="w-full group/btn">
          <Link href={`/lab/${component.id}`}>
            <span>Open Lab</span>
            <ArrowRight
              size={16}
              className="ml-2 group-hover/btn:translate-x-1 transition-transform"
            />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/20 dark:to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/50 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
              <Star className="mr-2" size={16} />
              Frontend Development Laboratory
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-gray-100 dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-6">
              Frontend Lab
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              My personal journey building interactive components and
              experimenting with React, TypeScript, and modern web technologies.
              Each component is a learning experience and exploration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="px-8 py-3 text-base" asChild>
                <Link href="#components">
                  Explore My Work
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 text-base"
                asChild
              >
                <Link
                  href="https://github.com/madhavnagpal/frontend-labs"
                  target="_blank"
                >
                  <Code2 className="mr-2" size={18} />
                  View Source
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Components Section */}
        <section id="components" className="pt-16 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Components
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Interactive components I've built while learning and experimenting
              with different concepts and techniques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {components.map((component) => (
              <ComponentCard key={component.id} component={component} />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="text-center">
          <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50">
            <CardContent className="p-12">
              <Code2
                className="mx-auto mb-6 text-blue-600 dark:text-blue-400"
                size={48}
              />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Learning Through Building
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Each component represents hands-on learning with React patterns,
                TypeScript, and modern frontend development. No fluff, just real
                code and real learning.
              </p>
              {components.length > 0 && (
                <Button size="lg" asChild>
                  <Link href={`/lab/${components[0].id}`}>
                    Start with {components[0].title}
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
