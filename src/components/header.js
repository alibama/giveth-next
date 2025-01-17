import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { IconButton, Text, Flex, Button } from 'theme-ui'
import styled from '@emotion/styled'
import { useMediaQuery } from 'react-responsive'
import Headroom from 'react-headroom'

import theme from '../utils/theme-ui'
import Logo from './content/Logo'
import { ProjectContext } from '../contextProvider/projectProvider'
import { PopupContext } from '../contextProvider/popupProvider'
import { isUserRegistered, shortenAddress } from '../lib/helpers'
import { Context as Web3Context } from '../contextProvider/Web3Provider'
import UserDetails from './account/userDetails'

const siteId = process.env.NEXT_PUBLIC_SITE_ID
const projectSearch = process.env.PROJECT_SEARCH

const CategoriesList = () => {
  const { currentProjectView } = React.useContext(ProjectContext)
  const categories = currentProjectView?.globalCategories

  if (!categories || categories?.length === 0) return null
  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <CategoriesListView>
        <Link href={'/projects'} passHref>
          <li>
            <p>All</p>
          </li>
        </Link>
        {categories
          ?.sort(function (a, b) {
            const textA = a.value.toUpperCase()
            const textB = b.value.toUpperCase()
            return textA < textB ? -1 : textA > textB ? 1 : 0
          })
          ?.map(c => {
            return (
              <Link
                href={{
                  pathname: '/projects',
                  query: { category: c.name }
                }}
                key={c.name}
                passHref
              >
                <li>
                  <p>{c.value}</p>
                </li>
              </Link>
            )
          })}
      </CategoriesListView>
    </Flex>
  )
}

const Header = ({ isHomePage }) => {
  const {
    state: { account, isEnabled, user, web3 },
    actions: { switchWallet, enableProvider, initOnBoard }
  } = useContext(Web3Context)

  const usePopup = useContext(PopupContext)

  const router = useRouter()
  const { triggerPopup } = usePopup

  const isXsWindow = useMediaQuery({ query: '(max-width: 576px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 825px)' })
  const isMobileForProjectBtn = useMediaQuery({ query: '(max-width: 1200px)' })

  const [hasScrolled, setScrollState] = useState(false)

  const pathname = router.pathname?.split('/')[1]

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.pageYOffset
      {
        if (scrollTop >= 50) {
          setScrollState(true)
        } else {
          setScrollState(false)
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return function cleanup() {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    router?.prefetch('/create')
  }, [])

  const goCreate = async () => {
    if (!isUserRegistered(user)) return triggerPopup('IncompleteProfile')
    router.push('/create')
  }

  const MainLogo = () => {
    return (
      <Link href='/' passHref>
        <LogoSpan className={hasScrolled || !isHomePage ? 'HeaderLogoScrolled' : ''}>
          <Logo />
          {siteId === 'giveth' && !isXsWindow && (
            <Text
              pl={3}
              sx={{
                fontWeight: 'medium'
              }}
            >
              GIVETH
            </Text>
          )}
        </LogoSpan>
      </Link>
    )
  }

  return (
    <Headroom style={{ zIndex: 5 }}>
      <HeaderContainer
        style={{
          marginBottom: '1.45rem'
        }}
      >
        <HeaderSpan className={hasScrolled || !isHomePage ? 'HeaderScrolled' : ''}>
          <Decorator>
            <img
              src={'/images/decorator-cloud1.svg'}
              alt='decorator-cloud1'
              width='100%'
              height='100%'
              style={{
                position: 'absolute',
                top: '-70px',
                left: '33vw'
              }}
              className='hide'
            />
            <img
              src={'/images/decorator-cloud2.svg'}
              alt='decorator-cloud2'
              style={{
                position: 'absolute',
                top: '-80px',
                left: '66vw'
              }}
              className='hide'
            />
          </Decorator>

          <MainLogo />

          <MiddleSpan>
            {!isMobile && (
              <Link href='/' passHref>
                <NavLink
                  style={{
                    display: ['none', 'block', 'block'],
                    color: isHomePage ? theme.colors.primary : theme.colors.secondary
                  }}
                >
                  Home
                </NavLink>
              </Link>
            )}
            <ProjectsCategories>
              <Link href='/projects' passHref>
                <NavLink
                  style={{
                    color: pathname === 'projects' ? theme.colors.primary : theme.colors.secondary
                  }}
                >
                  Projects
                </NavLink>
              </Link>
              {!isMobile && (
                <Flex className='categoriesContent'>
                  <CategoriesList />
                </Flex>
              )}
            </ProjectsCategories>
            <Link href='/join' passHref>
              <NavLink
                style={{
                  color: pathname === 'join' ? theme.colors.primary : theme.colors.secondary
                }}
              >
                Join{' '}
              </NavLink>
            </Link>
            {/* <NavLink href='/causes'>Causes</NavLink> */}
          </MiddleSpan>

          <UserSpan>
            {isMobileForProjectBtn ? null : (
              <Flex>
                {pathname !== 'projects' && (
                  <CreateLink onClick={goCreate}>Create a project</CreateLink>
                )}
                {projectSearch === 'true' && (
                  <IconButton>
                    <img src={'/images/icon-search.svg'} alt='' />
                  </IconButton>
                )}
              </Flex>
            )}
            {pathname !== 'projects' && (
              <img
                style={{ margin: '0 10px' }}
                src={'/images/icon-vertical-line.svg'}
                alt='vertical line svg'
              />
            )}

            {!!web3 && (
              <Button onClick={switchWallet} style={{ marginRight: '10px', cursor: 'pointer' }}>
                {account ? shortenAddress(account) : 'Switch Wallet'}
              </Button>
            )}

            {!isEnabled && (
              <Button onClick={web3 ? enableProvider : initOnBoard} style={{ cursor: 'pointer' }}>
                Connect Wallet
              </Button>
            )}

            {user && <UserDetails />}
          </UserSpan>
        </HeaderSpan>
      </HeaderContainer>
    </Headroom>
  )
}

const HeaderContainer = styled.header`
  transition: max-height 0.8s ease;
  height: 140px;
  position: relative;
  @media (max-width: 700px) {
    height: 160px;
  }
`

const HeaderSpan = styled.nav`
  position: absolute;
  z-index: 5;
  margin: 0 auto;
  padding: 80px 80px 0 80px;
  max-width: 100vw;
  top: 0;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  background-color: ${theme.colors.background};
  width: 100%;
  transition: padding 0.8s ease-out;
  backdrop-filter: blur(30px);
  .hide {
    transition: 0.8s;
    opacity: 1;
  }

  &.HeaderScrolled {
    background: ${theme.colors.headerbackground};
    padding: 1rem 80px;

    .hide {
      opacity: 0;
    }

    @media (max-width: 700px) {
      padding: 25px;
    }
  }

  @media (max-width: 1030px) {
    padding: 25px;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }

  @media (max-width: 700px) {
    padding: 25px;
    grid-template-columns: auto 1fr;
  }
`

const LogoSpan = styled.a`
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  justify-content: start;
`

const MiddleSpan = styled.span`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 3em;
  justify-self: center;
  max-width: 290px;
  z-index: 5;
  @media (max-width: 1030px) {
    grid-gap: 10px;
    grid-column: 2;
    grid-row: 1;
  }
`

const UserSpan = styled.span`
  position: relative;
  display: grid;
  grid-gap: 1.2em;
  grid-template-columns: repeat(4, auto);
  align-items: center;
  justify-self: end;
  @media (max-width: 1030px) {
    justify-items: end;
    grid-gap: 0;
    grid-row: 1;
    grid-column: 3;
  }
`

const NavLink = styled.a`
  cursor: pointer;
  font-family: ${theme.fonts.heading}, sans-serif;
  font-weight: 500;
  line-height: 21px;
  text-decoration: none;
  :hover {
    color: ${theme.colors.hover} !important;
  }
  :active {
    color: ${theme.colors.secondary};
  }
`

const CreateLink = styled.div`
  cursor: pointer;
  text-decoration: none;
  font-family: ${theme.fonts.body}, sans serif;
  text-transform: uppercase;
  font-weight: bold;
  line-height: 18px;
  letter-spacing: 0.04em;
  color: ${theme.colors.primary};
  align-self: center;
  :hover {
    color: ${theme.colors.hover};
  }
  :active {
    color: ${theme.colors.secondary};
  }
`

const Decorator = styled.div`
  position: absolute;
`

const ProjectsCategories = styled.div`
  .categoriesContent {
    visibility: hidden;
    max-width: 500px;
    text-align: center;
    margin: 0 5px 0 -10%;
    padding-top: 1%;
    border-radius: 6px;
    position: absolute;
    z-index: 5;
  }

  .categoriesContent a {
    text-decoration: underline;
  }

  &:hover .categoriesContent {
    visibility: visible;
  }
`

const CategoriesListView = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 1% 0 5% 0;
  box-shadow: 0px 5px 12px rgba(107, 117, 167, 0.3);
  background-color: ${theme.colors.background};
  li {
    cursor: pointer;
    font-size: 12px;
    color: ${theme.colors.secondary};
    width: 50%;
    padding: 0 5%;
    border-bottom: 1px solid ${theme.colors.softGray};
    text-align: left;
  }
  li:hover {
    font-weight: bold;
  }
`

export default Header
