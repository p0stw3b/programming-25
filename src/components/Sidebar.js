import React from "react"
import styled from "styled-components"
import { graphql, StaticQuery } from "gatsby"
import { Button } from "@material-ui/core"
import CourseSettings from "../../course-settings"
import { useTranslation } from "react-i18next"

import Logo from "./Logo"
import TreeView from "./TreeView"
import withSimpleErrorBoundary from "../util/withSimpleErrorBoundary"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import {
  MEDIUM_LARGE_BREAKPOINT,
  SMALL_MEDIUM_BREAKPOINT,
  MEDIUM_SIDEBAR_WIDTH,
  LARGE_SIDEBAR_WIDTH,
} from "../util/constants"

const StyledIcon = styled(FontAwesomeIcon)`
  vertical-align: middle;
  margin-right: 0.5em;
  margin-left: 0.1em;
  color: var(--color);
  font-size: 1.5em;
`

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;

  ${(props) =>
    !props.mobileMenuOpen &&
    `
      display: none;
    `}

  @media only screen and (min-width: ${SMALL_MEDIUM_BREAKPOINT}) {
    height: 100%;
    width: ${LARGE_SIDEBAR_WIDTH};
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    z-index: 100;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    overflow-y: scroll;
    display: flex;
  }
  @media only screen and (max-width: ${MEDIUM_LARGE_BREAKPOINT}) {
    width: ${MEDIUM_SIDEBAR_WIDTH};
    font-size: 0.85rem;
  }
  @media only screen and (max-width: ${SMALL_MEDIUM_BREAKPOINT}) {
    width: 90%;
    max-width: 500px;
    margin: 0 auto;
  }
`
const LogoContainer = styled.div`
  display: flex;
  background-color: white;
  justify-content: space-around;
  align-content: center;
  align-items: center;
`

const TreeViewContainer = styled.nav`
  flex: 1;
  margin-bottom: 1em;
`

const Brand = styled.div`
  width: 100%;
  text-align: center;
  padding: 1em;
  padding-top: 2em;
  font-weight: bold;
  color: #c0392b;
  font-size: 1.15em;
`

const MenuExpanderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1em;
  @media only screen and (min-width: ${SMALL_MEDIUM_BREAKPOINT}) {
    display: none;
  }
`

const MobileWrapper = styled.div`
  @media only screen and (max-width: ${SMALL_MEDIUM_BREAKPOINT}) {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999999;
    overflow-y: scroll;
    background-color: white;
  }
`

const MobileWrapperOrFragment = (props) => {
  if (props.mobileMenuOpen) {
    return <MobileWrapper {...props} />
  }
  return <div>{props.children}</div>
}

const Sidebar = (props) => {
  const { i18n } = useTranslation()
  const currentLang = i18n.language || "en"

  let edges =
    props.data?.allMarkdownRemark?.edges.map((o) => o.node?.frontmatter) || []
  if (process.env.NODE_ENV === "production") {
    edges = edges.filter((o) => !o.hidden)
  }

  // Filter pages by current language
  edges = edges.filter((o) => {
    if (!o.path) return false

    // Check if path matches current language
    if (currentLang === "ru") {
      return o.path.startsWith("/ru/")
    } else {
      // For English (default), exclude pages with language prefixes
      return !o.path.startsWith("/ru/")
    }
  })

  edges = edges
    .filter((o) => !o.hide_in_sidebar)
    .sort((a, b) =>
      a.title.localeCompare(b.title, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    )

  let coursePartEdges = edges.filter(
    (o) => !o.information_page && !o.course_info_page && !o.upcoming,
  )

  let informationPageEdges = edges
    .filter((o) => o.information_page || o.course_info_page)
    .sort((a, b) => b.sidebar_priority - a.sidebar_priority)

  let upcomingPageEdges = edges
    .filter((o) => o.upcoming)
    .map((o) => ({
      title: o.title,
      tba: o.upcoming,
      path: o.path,
      separator_after: o.separator_after,
    }))

  let content = informationPageEdges
    .concat(coursePartEdges)
    .concat(upcomingPageEdges)

  let separatorEdges = []
  content.forEach((edge) => {
    if (edge.separator_after) {
      separatorEdges.push(edge)
    }
  })

  separatorEdges.forEach((edge) => {
    let middlepoint = content.findIndex((o) => o.title === edge.title)
    content.splice(middlepoint + 1, 0, {
      separator: true,
      title: edge.separator_after,
    })
  })

  return (
    <MobileWrapperOrFragment mobileMenuOpen={props.mobileMenuOpen}>
      <MenuExpanderWrapper>
        <Button
          variant="outlined"
          color="primary"
          onClick={props.toggleMobileMenu}
        >
          {props.mobileMenuOpen ? (
            <span>
              <StyledIcon icon={faTimes} />
              Sulje valikko
            </span>
          ) : (
            <span>
              <StyledIcon icon={faBars} />
              Avaa valikko
            </span>
          )}
        </Button>
      </MenuExpanderWrapper>
      <SidebarContainer mobileMenuOpen={props.mobileMenuOpen}>
        <Brand>{CourseSettings.name}</Brand>
        <TreeViewContainer>
          <TreeView data={content} />
        </TreeViewContainer>
        <LogoContainer>
          <Logo />
        </LogoContainer>
      </SidebarContainer>
    </MobileWrapperOrFragment>
  )
}

const query = graphql`
  query {
    allMarkdownRemark(
      filter: { 
        fileAbsolutePath: { 
          regex: "/index.md|data/[^/]+\\.md$|data/[^/]+/index.md$|data/ru/[^/]+\\.md$|data/ru/part-[^/]+/index.md$|data/part-[^/]+/index.md$/" 
        } 
      }
      sort: { frontmatter: { path: ASC } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            information_page
            course_info_page
            path
            hidden
            separator_after
            upcoming
            hide_in_sidebar
            sidebar_priority
          }
        }
      }
    }
  }
`

const SidebarWithData = (props) => (
  <StaticQuery
    query={query}
    render={(data) => <Sidebar data={data} {...props} />}
  />
)

export default withSimpleErrorBoundary(SidebarWithData)
