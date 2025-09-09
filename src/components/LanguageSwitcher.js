import React from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import withSimpleErrorBoundary from "../util/withSimpleErrorBoundary"
import { navigate } from "gatsby"

const LanguageContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-right: 1rem;
`

const LanguageButton = styled.button`
  background: ${(props) => (props.active ? "#1976d2" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#1976d2")};
  border: 1px solid #1976d2;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.active ? "#1565c0" : "#e3f2fd")};
  }
`

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    // Store language preference in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("preferredLanguage", lng)

      // Get current path and remove the pathPrefix if present
      const currentPath = window.location.pathname
      const pathPrefix = "/programming-25"

      // Remove the pathPrefix to get the actual route
      let cleanPath = currentPath
      if (currentPath.startsWith(pathPrefix)) {
        cleanPath = currentPath.slice(pathPrefix.length) || "/"
      }

      // Remove existing language prefix if present
      let basePath = cleanPath
      if (cleanPath.startsWith("/ru")) {
        basePath = cleanPath.slice(3) || "/"
      } else if (cleanPath.startsWith("/en")) {
        basePath = cleanPath.slice(3) || "/"
      }

      // Ensure basePath doesn't start with multiple slashes
      if (basePath && !basePath.startsWith("/")) {
        basePath = "/" + basePath
      }

      // Navigate to language-specific path with pathPrefix
      let newPath = basePath
      if (lng === "ru") {
        // Check if the path exists in Russian version
        // For home page, use /ru
        if (basePath === "/") {
          newPath = "/ru"
        } else {
          // For other pages, add /ru prefix
          newPath = `/ru${basePath}`
        }
      }
      // For English, use the base path (no prefix)

      // Navigate directly without withPrefix (Gatsby handles this automatically)
      if (newPath !== currentPath) {
        navigate(newPath)
      }
    }
  }

  // Get current language
  const currentLanguage = i18n.language || "en"

  return (
    <LanguageContainer>
      <LanguageButton
        active={currentLanguage === "en"}
        onClick={() => changeLanguage("en")}
        aria-label="Switch to English"
      >
        EN
      </LanguageButton>
      <LanguageButton
        active={currentLanguage === "ru"}
        onClick={() => changeLanguage("ru")}
        aria-label="Switch to Russian"
      >
        RU
      </LanguageButton>
    </LanguageContainer>
  )
}

export default withSimpleErrorBoundary(LanguageSwitcher)
