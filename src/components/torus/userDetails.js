/** @jsx jsx */
import { Button, Text, jsx } from 'theme-ui'
import { useContext, useState } from 'react'
import styled from '@emotion/styled'
import theme from '../../gatsby-plugin-theme-ui/index'
import { Link } from 'gatsby'
import { TorusContext } from '../../contextProvider/torusProvider'
import { ProveWalletContext } from '../../contextProvider/proveWalletProvider'

const AccountDetails = styled.div`
  width: 200px;
  position: absolute;
  padding: 5px 0;
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.background};
  box-sizing: border-box;
  box-shadow: 0px 5px 12px rgba(107, 117, 167, 0.3);
  border-radius: 6px;
  z-index: 205;
  right: 0px;
  top: 60px;
  display: grid;
  grid-template-rows: repeat(7, auto);
  grid-gap: 0px 1rem;
  .shadow {
    box-shadow: 0px 1px 0px #f5f5f5;
  }
  .boxheight {
    display: flex;
    align-self: center;
    padding-top: 11px;
    padding-bottom: 11px;
  }
  & :hover .balance {
    opacity: 1;
  }
`

const MenuItem = styled(Text)`
  align-self: center;
  padding-left: 16px;
  cursor: pointer;
  align-content: center;
  color: ${theme.colors.secondary};
  :hover {
    color: ${theme.colors.primary};
  }
`

const MenuTitle = styled(Text)`
  align-self: center;
  padding-left: 16px;
  align-content: center;
  color: ${theme.colors.secondary};
`

const MenuLink = styled.a`
  text-decoration: none;
`

const Dot = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 50%;
  display: inline-block;
  margin: 0 4px 0 0;
`

const UserDetails = () => {
  const [active, setActive] = useState(false)

  const { logout, user, balance, network } = useContext(TorusContext)
  const { proveWallet, isWalletProved } = useContext(ProveWalletContext)

  const address = (user?.addresses && user.addresses[0]) || ''
  const truncAddress = `${address.substring(0, 14)}...${address.substring(
    address.length - 4,
    address.length
  )}`

  const handleMenu = e => {
    if (active) {
      setActive(false)
    } else {
      setActive(true)
    }
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div>
      <Button
        sx={{ variant: 'buttons.nofill' }}
        style={{
          display: 'flex',
          cursor: 'pointer',
          alignItems: 'center',
          padding: '0.5rem',
          border: '0'
        }}
        onClick={() => {
          handleMenu()
        }}
      >
        <img
          alt=''
          style={{ width: '30px', borderRadius: '15px' }}
          src={user?.profileImage}
          className='avatarimage'
        />

        <Text
          p={1}
          sx={{
            variant: 'text.default',
            fontWeight: 'normal',
            ml: 2,
            color: 'secondary'
          }}
        >
          {user?.name}
        </Text>
      </Button>
      {active ? (
        <AccountDetails>
          <MenuTitle
            sx={{ variant: 'text.overlineSmall', pt: 2, color: 'bodyDark' }}
          >
            Wallet Address
          </MenuTitle>
          <MenuItem
            sx={{ variant: 'text.medium', color: 'secondary' }}
            onClick={() => navigator.clipboard.writeText(address)}
          >
            {truncAddress}
          </MenuItem>
          <MenuTitle
            sx={{
              variant: 'text.small',
              pb: 2,
              '&:focus': { color: 'red' }
            }}
            className='balance'
          >
            Balance: {balance ? `${balance} ETH` : ''}
          </MenuTitle>
          <MenuTitle
            sx={{ variant: 'text.overlineSmall', pt: 2, color: 'bodyDark' }}
          >
            Torus Network
          </MenuTitle>
          <MenuTitle
            sx={{
              variant: 'text.medium',
              pb: 2,
              color: 'secondary',
              textTransform: 'capitalize'
            }}
            onClick={() => navigator.clipboard.writeText(address)}
          >
            <Dot sx={{ backgroundColor: network ? 'greenishBlue' : 'red' }} />
            {network || 'No network'}
          </MenuTitle>
          <Link
            to='/account'
            sx={{ textDecoration: 'none', textDecorationLine: 'none' }}
          >
            <MenuItem
              sx={{
                variant: 'text.medium'
              }}
              className='shadow boxheight'
            >
              My Account
            </MenuItem>
          </Link>
          {!isWalletProved && (
            <MenuItem
              sx={{
                variant: 'text.medium'
              }}
              onClick={proveWallet}
              className='boxheight'
            >
              Verify Your Wallet
            </MenuItem>
          )}
          <MenuItem
            sx={{
              variant: 'text.medium'
            }}
            className='shadow boxheight'
          >
            Settings
          </MenuItem>
          <MenuItem
            sx={{
              variant: 'text.medium'
            }}
            className='shadow boxheight'
          >
            My Projects
          </MenuItem>
          <MenuLink
            href='https://github.com/Giveth/giveth-2/issues/new/choose'
            target='_blank'
            rel='noopener noreferrer'
          >
            <MenuItem
              sx={{
                variant: 'text.medium'
              }}
              className='shadow boxheight'
            >
              Report a bug
            </MenuItem>
          </MenuLink>
          <MenuLink
            href='https://discord.gg/JYNBDuFUpG'
            target='_blank'
            rel='noopener noreferrer'
          >
            <MenuItem
              sx={{
                variant: 'text.medium'
              }}
              className='shadow boxheight'
            >
              Support
            </MenuItem>
          </MenuLink>
          <MenuItem
            sx={{
              variant: 'text.medium'
            }}
            onClick={handleLogout}
            className='boxheight'
          >
            Sign out
          </MenuItem>
        </AccountDetails>
      ) : null}
    </div>
  )
}

export default UserDetails
