import React, { useContext } from 'react'
import { Text, Link, Flex } from 'theme-ui'
import Avatar from '../avatar'
import { ETHERSCAN_PREFIXES } from '../../lib/util'
import { Context as Web3Context } from '../../contextProvider/Web3Provider'

export const ProfileHeader = props => {
  const {
    state: { networkId, user }
  } = useContext(Web3Context)

  const { donations, projects } = props

  const TitleBox = ({ title, content }) => {
    return (
      <Flex
        sx={{
          width: '100%',
          flexDirection: 'column',
          padding: '20px 24px',
          margin: '0 10px',
          backgroundColor: 'softGray',
          borderRadius: '12px'
        }}
      >
        <Text
          sx={{
            fontSize: 1,
            fontWeight: 500,
            color: 'secondary',
            textTransform: 'uppercase'
          }}
        >
          {title}
        </Text>
        <Text sx={{ color: 'primary', fontSize: 7 }}>{content}</Text>
      </Flex>
    )
  }

  return (
    <Flex
      sx={{
        flex: 1,
        m: [3, 5, 5],
        flexDirection: ['column', 'column', 'row'],
        justifyContent: 'space-between'
      }}
    >
      <Flex
        sx={{
          flex: [1, 0.5, 0.5],
          mr: 4,
          flexDirection: ['column', 'row', 'row'],
          width: ['100%', null, null],
          alignItems: ['left', null, null]
        }}
      >
        <Avatar img={user?.profileImage || user?.avatar} size={100} address={user?.walletAddress} />
        <Flex sx={{ flexDirection: 'column', ml: [0, '27px', '27px'] }}>
          <Text sx={{ color: 'secondary', fontSize: 7 }}>{user?.name}</Text>
          <a
            style={{ textDecoration: 'none' }}
            target='blank'
            rel='noopener noreferrer'
            href={`${ETHERSCAN_PREFIXES[networkId]}address/${user?.walletAddress}`}
          >
            <Text
              sx={{
                color: 'bodyLight',
                fontSize: 3,
                cursor: 'pointer',
                wordBreak: 'break-all'
              }}
            >
              {user?.walletAddress}
            </Text>
          </a>
          <Link
            sx={{ textDecoration: 'none' }}
            href={/^(?:f|ht)tps?:\/\//.test(user?.url) ? user?.url : `//${user?.url}`}
            target='_blank'
          >
            <Text
              sx={{
                color: 'secondary',
                fontSize: 3,
                cursor: 'pointer',
                wordBreak: 'break-all'
              }}
            >
              {user?.url}
            </Text>
          </Link>
        </Flex>
      </Flex>
      <Flex
        sx={{
          flex: 0.5,
          mt: [4, 4, 0]
        }}
      >
        <TitleBox title='PROJECTS' content={projects?.length || 0} />
        <TitleBox title='DONATIONS' content={donations?.length || 0} />
      </Flex>
    </Flex>
  )
}
