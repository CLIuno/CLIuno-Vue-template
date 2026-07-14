<script setup lang="ts">
import { Heart, Moon, Rocket, Zap } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const steps = [
  {
    title: 'Step 1: Choose Your Template',
    text: 'Browse through our collection of ready-to-use templates.',
  },
  {
    title: 'Step 2: Customize It',
    text: 'Adjust the template to your needs with minimal effort.',
  },
  {
    title: 'Step 3: Launch',
    text: 'Deploy and launch your project in no time.',
  },
]

const features = [
  {
    icon: Zap,
    title: 'Open Source',
    text: 'Use it for free and contribute to the project.',
  },
  {
    icon: Heart,
    title: 'Free',
    text: 'Use even for commercial projects, no cost at all.',
  },
  {
    icon: Moon,
    title: 'Simplicity First',
    text: 'No experience needed. Just plug and play.',
  },
  {
    icon: Rocket,
    title: 'Fast Launch',
    text: 'Get projects off the ground with one command.',
  },
]
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background text-foreground">
    <NavbarComp />

    <main class="flex-1">
      <!-- Hero Section -->
      <section class="border-b">
        <div class="container mx-auto flex flex-col items-center gap-6 px-4 py-24 text-center">
          <Badge variant="outline">Open source full-stack templates</Badge>
          <h1 class="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Welcome to CLIuno Templates
          </h1>
          <p class="max-w-xl text-lg text-muted-foreground">
            The ultimate tool to make your journey in web development less painful.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" as-child>
              <RouterLink :to="{ name: 'register' }">Get Started</RouterLink>
            </Button>
            <Button size="lg" variant="outline" as-child>
              <a href="https://github.com/CLIuno" target="_blank" rel="noopener">Docs</a>
            </Button>
          </div>
        </div>
      </section>

      <!-- Steps Section -->
      <section class="container mx-auto px-4 py-20">
        <div class="mb-12 text-center">
          <h2 class="text-3xl font-bold tracking-tight">Reset Your Development Journey</h2>
          <p class="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Forget the confusion and complexity&mdash;use our templates to start your next project
            without the hassle.
          </p>
        </div>
        <div class="grid gap-6 lg:grid-cols-3">
          <Card v-for="step in steps" :key="step.title">
            <CardHeader>
              <CardTitle>{{ step.title }}</CardTitle>
            </CardHeader>
            <CardContent class="text-muted-foreground">
              {{ step.text }}
            </CardContent>
          </Card>
        </div>
      </section>

      <!-- Features Section -->
      <section class="container mx-auto px-4 pb-20">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card v-for="feature in features" :key="feature.title">
            <CardContent>
              <div
                class="mb-4 flex size-10 items-center justify-center rounded-lg bg-muted text-foreground"
              >
                <component :is="feature.icon" class="size-5" />
              </div>
              <h3 class="font-semibold">{{ feature.title }}</h3>
              <p class="mt-1 text-sm text-muted-foreground">{{ feature.text }}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>

    <FooterComp />
  </div>
</template>
