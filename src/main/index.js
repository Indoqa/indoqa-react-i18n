const availableLocales = []
const allTranslations = {}

let locale = 'en'

export const addAvailableLocale = (value) => {
  availableLocales.push(value)
}

export const setLocale = (value) => {
  if (availableLocales.includes(value)) {
    locale = value
  }
}

const addTranslations = (target, values) => {
  for (const eachKey in values) {
    if (values.hasOwnProperty(eachKey)) {
      target[eachKey] = values[eachKey]
    }
  }
}

export const register = (name, translations) => {
  if (!allTranslations[name]) {
    allTranslations[name] = translations
  } else {
    addTranslations(allTranslations[name], translations)
  }
}

const getLanguageKey = (key) => {
  return [...key, locale]
}

const translate = (key, ...parameters) => {
  const languageKey = getLanguageKey(key)

  let value = allTranslations
  languageKey.forEach(eachKey => {
    if (value) {
      value = value[eachKey]
    }
  })

  if (value === undefined || value === null) {
    return null
  }

  if (typeof value === 'function') {
    return value(...parameters)
  }

  return value
}

export const maybeI18n = (key, defaultValue, ...parameters) => {
  const result = translate(key, ...parameters)
  if (result !== null) {
    return result
  }

  return defaultValue
}

export const i18n = (key, ...parameters) => {
  const result = translate(key, ...parameters)
  if (result !== null) {
    return result
  }

  return `Missing key ${getLanguageKey(key)}`
}
