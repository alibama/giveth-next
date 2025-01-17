import React from 'react'
import styled from '@emotion/styled'
import { Spinner, Flex, Text } from 'theme-ui'
import theme from '../../utils/theme-ui'
import DonationsTable from './donationsTable'

const DonationsTab = ({ project, donations: projectDonations }) => {
  const [loading, setLoading] = React.useState(true)
  const donations = projectDonations?.filter(el => el != null)
  const totalDonations = project?.fromTrace
    ? project?.donationCounters?.reduce((a, b) => {
        return a + b?.donationCount
      }, 0)
    : donations
    ? donations?.reduce((total, donation) => total + donation?.amount || 0, 0)
    : 0
  const totalUSDonations = project?.fromTrace
    ? null
    : donations
    ? donations?.reduce((total, donation) => total + donation?.valueUsd || 0, 0)
    : 0
  const totalETHDonations = donations
    ? donations?.reduce((total, donation) => total + donation?.valueEth || 0, 0)
    : 0

  React.useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return <Spinner variant='spinner.medium' />
  }

  if (donations?.length === 0)
    return <Text sx={{ variant: 'text.large', color: 'secondary' }}>No donations yet :(</Text>
  return (
    <div>
      {!project?.fromTrace && (
        <Funds>
          {totalUSDonations && totalDonations > 0 ? (
            <Flex
              sx={{
                flexDirection: 'column'
              }}
            >
              <Text sx={{ variant: 'text.large', color: 'secondary' }}>TOTAL FUNDS RAISED:</Text>
              <Flex
                sx={{
                  flexDirection: 'row',
                  alignItems: 'flex-end'
                }}
              >
                <Text
                  // variant={['headings.h3', null, 'headings.display']}
                  sx={{
                    pr: 4,
                    color: 'secondary',
                    variant: 'headings.display'
                    // variant: ['headings.h3', 'headings.display', 'headings.display']
                  }}
                >
                  {totalUSDonations?.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })}
                </Text>
                <Text
                  sx={{
                    // variant: ['headings.h6', null, 'headings.h5'],
                    variant: 'headings.h5',
                    pb: 3,
                    color: 'secondary'
                  }}
                >
                  {totalETHDonations ? `${parseFloat(totalETHDonations).toFixed(4)} ETH` : null}
                </Text>
              </Flex>
            </Flex>
          ) : null}
          {project?.walletAddress && (
            <Flex sx={{ flexDirection: 'column' }}>
              <Text sx={{ variant: 'text.medium', color: 'bodyLight', mb: 2 }}>
                Project Address
              </Text>

              <Text
                sx={{
                  variant: 'text.medium',
                  color: 'bodyLight',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  mt: -2
                }}
                onClick={() =>
                  window.open(`https://etherscan.io/address/${project?.walletAddress}`)
                }
              >
                {project?.walletAddress}
              </Text>
            </Flex>
          )}
        </Funds>
      )}

      <DonationsTable donations={donations} />
    </div>
  )
}

const Funds = styled.div`
  padding: 2rem;
  background: ${theme.colors.lightestBlue};
  border: 1px solid #d4daee;
  box-sizing: border-box;
  border-radius: 12px;
`

export default DonationsTab
