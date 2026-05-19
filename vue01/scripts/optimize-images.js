const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const IMAGE_DIR = path.join(__dirname, '..', 'public', 'image')

const SIZE_RULES = [
  { pattern: /qianbackground/, maxWidth: 800 },
  { pattern: /backgroun1/, maxWidth: 800 },
  { pattern: /ground/, maxWidth: 800 },
  { pattern: /sun/, maxWidth: 400 },
  { pattern: /\.(png|jpg|jpeg)$/i, maxWidth: 400 }
]

function getMaxWidth(filename) {
  for (const rule of SIZE_RULES) {
    if (rule.pattern.test(filename)) {
      return rule.maxWidth
    }
  }
  return 400
}

function getFileSize(filepath) {
  try {
    return fs.statSync(filepath).size
  } catch {
    return 0
  }
}

function formatSize(bytes) {
  return (bytes / 1024).toFixed(1) + ' KB'
}

async function optimizeImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase()
  const basename = path.basename(inputPath, ext)
  const dir = path.dirname(inputPath)
  const filename = path.basename(inputPath)
  const maxWidth = getMaxWidth(filename)

  const webpPath = path.join(dir, basename + '.webp')

  const pipeline = sharp(inputPath).resize({ width: maxWidth, withoutEnlargement: true })

  let compressPath = inputPath
  if (ext === '.png') {
    await pipeline.png({ quality: 80, compressionLevel: 9 }).toFile(inputPath + '.tmp')
    compressPath = inputPath + '.tmp'
  } else if (ext === '.jpg' || ext === '.jpeg') {
    await pipeline.jpeg({ quality: 80, mozjpeg: true }).toFile(inputPath + '.tmp')
    compressPath = inputPath + '.tmp'
  }

  await pipeline.webp({ quality: 80 }).toFile(webpPath)

  if (compressPath !== inputPath && fs.existsSync(compressPath)) {
    const origSize = getFileSize(inputPath)
    const newSize = getFileSize(compressPath)
    if (newSize > 0 && newSize < origSize) {
      fs.unlinkSync(inputPath)
      fs.renameSync(compressPath, inputPath)
    } else {
      if (fs.existsSync(compressPath)) fs.unlinkSync(compressPath)
    }
  }
}

async function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await walkDir(fullPath)
    } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
      await optimizeImage(fullPath)
    }
  }
}

async function main() {
  console.log('开始优化图片...\n')

  const beforeSizes = new Map()
  function collectSizes(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fp = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        collectSizes(fp)
      } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
        beforeSizes.set(fp, getFileSize(fp))
      }
    }
  }
  collectSizes(IMAGE_DIR)

  const beforeTotal = [...beforeSizes.values()].reduce((a, b) => a + b, 0)
  console.log(`优化前图片总大小: ${formatSize(beforeTotal)} (${beforeSizes.size} 张)\n`)

  await walkDir(IMAGE_DIR)

  let afterTotal = 0
  let webpTotal = 0
  const afterFiles = []
  function collectAfter(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fp = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        collectAfter(fp)
      } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
        afterTotal += getFileSize(fp)
        afterFiles.push(fp)
      } else if (/\.webp$/i.test(entry.name)) {
        webpTotal += getFileSize(fp)
      }
    }
  }
  collectAfter(IMAGE_DIR)

  console.log(`优化后原图总大小: ${formatSize(afterTotal)}`)
  console.log(`WebP 版本总大小: ${formatSize(webpTotal)}`)
  console.log(`总节省: ${formatSize(beforeTotal - afterTotal)} (原图压缩)`)
  console.log(`WebP 相比原图更小约: ${formatSize(afterTotal - webpTotal)}`)
  console.log('\n图片优化完成!')
}

main().catch(err => {
  console.error('优化失败:', err)
  process.exit(1)
})
