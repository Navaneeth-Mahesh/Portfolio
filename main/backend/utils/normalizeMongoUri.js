function normalizeMongoUri(uri) {
  if (!uri || typeof uri !== 'string') return uri

  let normalized = uri.trim()

  if (normalized && !normalized.startsWith('mongodb://') && !normalized.startsWith('mongodb+srv://')) {
    normalized = `mongodb+srv://${normalized.replace(/^\/+/, '')}`
  }

  return normalized
}

module.exports = { normalizeMongoUri }

