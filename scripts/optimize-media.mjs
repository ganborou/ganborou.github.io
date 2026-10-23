import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import sharp from 'sharp'

const assets = JSON.parse(await readFile('docs/asset-manifest.json', 'utf8'))
const media = {}
const requestedPrefix = process.argv[2]
if (requestedPrefix) Object.assign(media, JSON.parse(await readFile('src/data/media.generated.json', 'utf8')))
let originalBytes = 0
let optimizedBytes = 0

for (const asset of assets) {
  if (requestedPrefix && !asset.originalPublicPath.startsWith(requestedPrefix)) continue
  if (asset.sourcePath.endsWith('.svg') && !asset.renderWidth) continue
  const original = await readFile(asset.sourcePath)
  let raster = original
  if (asset.renderWidth) {
    // Rasterize vector artwork once at its Retina size, before making variants.
    // Figma SVGs can contain embedded photos exceeding libxml's default limit.
    const vector = await sharp(original, { unlimited: true }).metadata()
    raster = await sharp(original, { density: 72 * asset.renderWidth / vector.width, unlimited: true })
      .resize({ width: asset.renderWidth, height: asset.renderHeight, fit: 'fill' })
      .png().toBuffer()
  }
  const metadata = await sharp(raster).metadata()
  const isCover = /^\/media\/projects\/[^/]+\.png$/.test(asset.originalPublicPath)
  const isDetailedCase = /^\/media\/projects\/(volna|ministry-of-culture|cultural-marathon|digital-lesson|party-posters|lovemachine|charmer|digital-love|onboarding|redesign)\//.test(asset.originalPublicPath)
  const targetWidths = isCover ? [443, 886, 1329, metadata.width]
    : isDetailedCase ? [480, 960, 1440, 1920, 2880, metadata.width]
      : [480, 960, Math.min(metadata.width, 1440)]
  const widths = [...new Set(targetWidths.filter((width) => width <= metadata.width))].sort((a, b) => a - b)
  const variants = []
  for (const width of widths) {
    const outputPath = asset.publicPath.replace(/\.webp$/, `-${width}.webp`)
    const output = await sharp(raster).resize({ width, withoutEnlargement: true }).webp(isCover || asset.lossless ? { lossless: true, effort: 5 } : { quality: isDetailedCase ? 95 : 88, effort: 5 }).toBuffer()
    await mkdir(dirname(`public${outputPath}`), { recursive: true })
    await writeFile(`public${outputPath}`, output)
    variants.push({ src: outputPath, width })
    optimizedBytes += output.length
  }
  const fallback = variants.at(-1)
  media[asset.originalPublicPath] = {
    src: fallback.src,
    srcSet: variants.map(({ src, width }) => `${src} ${width}w`).join(', '),
    width: metadata.width,
    height: metadata.height,
  }
  originalBytes += original.length
  console.log(`${asset.originalPublicPath}: ${variants.length} variants, up to ${metadata.width}px`)
}

await writeFile('src/data/media.generated.json', JSON.stringify(media, null, 2) + '\n')
console.log(`Media: ${(originalBytes / 1048576).toFixed(1)} MB of originals → ${(optimizedBytes / 1048576).toFixed(1)} MB across all responsive variants.`)
