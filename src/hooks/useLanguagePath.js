import { useTranslation } from "react-i18next"

/**
 * Hook that returns a function to generate language-aware paths
 * @returns {Function} - Function that takes a path and returns language-specific path
 */
export const useLanguagePath = () => {
  const { i18n } = useTranslation()
  const currentLang = i18n.language

  return (path) => {
    if (!path) return path

    // Handle external URLs
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path
    }

    // Handle anchor links
    if (path.startsWith("#")) {
      return path
    }

    // Remove leading slash for processing
    const cleanPath = path.startsWith("/") ? path.slice(1) : path

    // Check if path already has language prefix
    const hasRuPrefix = cleanPath.startsWith("ru/")
    const hasEnPrefix = cleanPath.startsWith("en/")

    // Remove existing language prefix if present
    let basePath = cleanPath
    if (hasRuPrefix) {
      basePath = cleanPath.slice(3)
    } else if (hasEnPrefix) {
      basePath = cleanPath.slice(3)
    }

    // Add appropriate language prefix
    // Gatsby will automatically add the pathPrefix when building with --prefix-paths
    if (currentLang === "ru") {
      return `/${basePath ? `ru/${basePath}` : "ru"}`
    }

    // Default to English (no prefix needed)
    return `/${basePath}`
  }
}

export default useLanguagePath
