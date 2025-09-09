import React, { Fragment } from "react"
import PagesContext from "../contexes/PagesContext"
import { nthIndex } from "../util/strings"
import { Link } from "gatsby"
import styled from "styled-components"
import { withTranslation } from "react-i18next"
import { Divider, Paper } from "@material-ui/core"
import withSimpleErrorBoundary from "../util/withSimpleErrorBoundary"
import useLanguagePath from "../hooks/useLanguagePath"

const PagesList = styled.ol`
  padding-left: 0;
  margin-bottom: 0;

  a {
    text-decoration: none;
  }
`

const Page = styled.li`
  margin: 0.5rem;
  padding: 1em;
  list-style-type: none;
  color: black;
  text-decoration: none;
  border-radius: 10px;

  ${(props) =>
    props.currentPage &&
    `
    background-color: black;
    border-radius: 0.25rem;
    color: white;

    :hover {
      background-color: #380C0E !important;
      color: white !important;
    }
  `}
  :hover {
    background-color: #f5ebeb;
    color: black;
  }
`

const StyledLink = styled(Link)`
  :hover {
    text-decoration: none;
  }
`

const Title = styled.div`
  margin-bottom: 0.35em;
  color: rgba(0, 0, 0, 0.87);
  font-size: 1.5em;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.33;
  letter-spacing: 0em;
`

const StyledPaper = styled(Paper)`
  padding: 1em;
  margin-bottom: 2em;
`

const PagesInThisSection = ({ style, t }) => {
  const getLanguagePath = useLanguagePath()

  return (
    <PagesContext.Consumer>
      {(value) => {
        const currentPath = value.current.frontmatter.path
        let sectionPath = currentPath

        // Check if the path starts with a language prefix
        const languagePrefixes = ["/ru/", "/fi/"]
        const hasLanguagePrefix = languagePrefixes.some((prefix) =>
          currentPath.startsWith(prefix),
        )

        // Use 3rd "/" for language-prefixed paths, 2nd "/" for regular paths
        const separatorIndex = hasLanguagePrefix ? 3 : 2
        const sectionSeparator = nthIndex(currentPath, "/", separatorIndex)

        if (sectionSeparator !== -1) {
          sectionPath = currentPath.substr(0, sectionSeparator)
        }

        const sectionPages = value.all
          .filter((o) => o.path.startsWith(`${sectionPath}/`))
          .sort((a, b) => {
            a = a.path.toLowerCase()
            b = b.path.toLowerCase()

            return a > b ? 1 : b > a ? -1 : 0
          })

        // Debug logging
        if (
          typeof window !== "undefined" &&
          window.location.pathname.includes("part-1")
        ) {
          console.group("PagesInThisSection Debug")
          console.log("Current path:", currentPath)
          console.log("Section path:", sectionPath)
          console.log("Total pages in context:", value.all.length)
          console.log("Filtered section pages:", sectionPages.length)
          console.log(
            "Section pages:",
            sectionPages.map((p) => p.path),
          )
          console.groupEnd()
        }

        return (
          <StyledPaper style={style}>
            <Title>{t("inThisSection")}</Title>
            <PagesList>
              {sectionPages.map((page, i) => {
                const languageAwarePath = getLanguagePath(page.path)
                return (
                  <Fragment key={`page-${page.path}-${i}`}>
                    <StyledLink to={languageAwarePath}>
                      <Page currentPage={page.path === currentPath}>
                        {i + 1}. {page.title}
                      </Page>
                    </StyledLink>
                    {i !== sectionPages.length - 1 && (
                      <Divider variant="middle" />
                    )}
                  </Fragment>
                )
              })}
            </PagesList>
          </StyledPaper>
        )
      }}
    </PagesContext.Consumer>
  )
}

export default withTranslation("common")(
  withSimpleErrorBoundary(PagesInThisSection),
)
