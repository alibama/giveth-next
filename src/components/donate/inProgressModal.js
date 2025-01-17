import React from 'react'
import Link from 'next/link'
import { Button, Flex, Text, Spinner } from 'theme-ui'
import theme from '../../utils/theme-ui/index'
import { ETHERSCAN_PREFIXES } from '../../lib/util'

const InProgressModal = ({ showModal, setShowModal, txHash, networkId }) => {
  if (!showModal) return null
  return (
    <Flex
      sx={{
        display: showModal ? 'flex' : 'none',
        position: 'absolute',
        top: '15%',
        right: [0, '15%', '30%'],
        zIndex: 5,
        alignItems: 'center',
        padding: '6% 0',
        flexDirection: 'column',
        width: ['100vw', '600px', '600px'],
        backgroundColor: 'white',
        boxShadow: '0px 28px 52px rgba(44, 13, 83, 0.2)',
        borderRadius: '2px'
      }}
    >
      <Button
        type='button'
        onClick={() => {
          setShowModal(false)
        }}
        aria-label='close'
        sx={{
          position: 'absolute',
          top: '32px',
          right: '32px',
          fontSize: '3',
          fontFamily: 'body',
          color: 'secondary',
          background: 'unset',
          cursor: 'pointer'
        }}
      >
        Close
      </Button>
      <Spinner size={120} strokeWidth={2} />
      <Text sx={{ mt: 4, color: 'secondary', variant: 'headings.h4' }}>
        Donation is still in progress...
      </Text>
      <Text
        sx={{
          mt: 2,
          mb: 2,
          mx: 5,
          textAlign: 'center',
          variant: 'text.default'
        }}
      >
        Transaction has been submitted and is waiting for confirmation.
        <a
          style={{ textDecoration: 'none', color: theme.colors.primary }}
          href={`${ETHERSCAN_PREFIXES[networkId]}tx/${txHash}`}
          rel='noreferrer noopener'
          target='_blank'
        >
          View on Etherscan
        </a>
      </Text>
      <Text sx={{ mt: 2, mx: 5, textAlign: 'center', variant: 'text.default' }}>
        You can safely close this window and return to Homepage. Your transaction will show in ${' '}
        <Link href='/account?view=donations'>
          <a style={{ textDecoration: 'none', color: theme.colors.primary }}>My Account.</a>
        </Link>
      </Text>

      <Button
        type='button'
        variant='nofill'
        sx={{
          mt: 4,
          color: 'bodyLight',
          width: '240px',
          height: '52px',
          border: '2px solid #AAAFCA'
        }}
      >
        <Link href={'/'}>
          <a>GO TO HOMEPAGE</a>
        </Link>
      </Button>
    </Flex>
  )
}

export default InProgressModal
