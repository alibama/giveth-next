import React from 'react'
import { Link } from 'gatsby'
import { Button, Flex, Text } from 'theme-ui'

export const DescriptionInstructionModal = ({ showModal, setShowModal }) => (
  <div
    css={{
      display: showModal ? 'flex' : 'none',
      position: 'absolute',
      left: '25%',
      top: '-30%',
      padding: '10%',
      flexDirection: 'column',
      width: '600px',
      backgroundColor: 'white',
      boxShadow: '0px 28px 52px rgba(44, 13, 83, 0.2)',
      borderRadius: '2px'
    }}
  >
    <Button
      type='button'
      onClick={() => setShowModal(false)}
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
    <Text
      sx={{ mt: '10px', fontSize: 7, textAlign: 'center', fontFamily: 'body' }}
    >
      How to write a good project description
    </Text>
    <Text
      sx={{ mt: '80px', fontSize: 4, textAlign: 'left', fontFamily: 'body' }}
    >
      Try to use this structure as a guidance when writing the description:
    </Text>
    <ol css={{ alignItems: 'start', paddingLeft: '0.8rem' }}>
      {['who', 'what', 'why', 'where', 'how', 'when'].map(item => {
        return (
          <li key={item} css={{ marginTop: '10px', font: 'Fira Sans' }}>
            <Text
              sx={{
                fontFamily: 'body',
                textTransform: 'capitalize',
                fontWeight: 'bold'
              }}
            >
              {`${item}?`}
            </Text>
          </li>
        )
      })}
    </ol>
    <Text
      sx={{ mt: '20px', fontSize: 4, textAlign: 'left', fontFamily: 'body' }}
    >
      See how others have done it.
      <Link css={{ textDecoration: 'none' }} to='/'>
        <Text sx={{ color: 'primary' }}>Browse examples.</Text>
      </Link>
    </Text>
    <Text
      sx={{ mt: '20px', fontSize: 4, textAlign: 'left', fontFamily: 'body' }}
    >
      Want to learn more? Read our blog post tutorial <br />
      <Link css={{ textDecoration: 'none' }} to='/'>
        <Text sx={{ color: 'primary' }}>
          "How to write a fundraising project description to increase donations"
        </Text>
      </Link>
    </Text>
  </div>
)