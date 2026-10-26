
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

// Extract route names from existing project data
async function extractValues(file, property) {
  const source = await readFile(file, 'utf8')

  const pattern = new RegExp(
    `^\\s*${property}:\\s*['"]([^'"]+)['"]`,
    'gm'
  )

  return [...source.matchAll(pattern)].map((match) => match[1])
}

const categories = await extractValues(
  'src/data/categories.ts',
  'id'
)

const projects = await extractValues(
  'src/data/projects.ts',
  'slug'
)

if (!categories.length || !projects.length) {
  throw new Error('Could not detect portfolio routes')
}

const routes = [
  ...categories.map((id) => `work/${id}`),
  ...projects.map((slug) => `projects/${slug}`),
]

const html = await readFile('dist/index.html', 'utf8')

for (const route of routes) {
  const segments = route.split('/')

  if (segments.some((s) => !/^[a-z0-9-]+$/.test(s))) {
    throw new Error(`Invalid route: ${route}`)
  }

  const destination = join('dist', route, 'index.html')

  await mkdir(dirname(destination), { recursive: true })
  await writeFile(destination, html)

  console.log(`Generated: /${route}/`)
}

console.log(`Generated ${routes.length} routes`)

