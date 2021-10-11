import React from "react"
import { Box } from "theme-ui"
import { fetchEntries } from "../src/utils/contentfulPosts"
import Seo from "../src/components/seo"
import AboutPage from "../src/components/content/AboutPage"

const About = (props) => {
  return (
    <>
      <Seo title="FAQ" />
      <Box>
        <AboutPage {...props} />
      </Box>
    </>
  )
}

export async function getServerSideProps() {
  // contentful
  const teamReq = await fetchEntries({
    contentType: "contentTeam",
  })
  const aboutReq = await fetchEntries({
    contentType: "contentAbout",
  })

  const team = teamReq?.map((f) => f.fields)
  const about = aboutReq?.map((f) => f.fields)
  console.log({ team: JSON.stringify(team) })
  return {
    props: {
      team: team || {},
      about: about || {},
    },
  }
}

export default About

// export const query = graphql`
//   query AboutQuery {
//     contentTeam: allContentfulContentTeam {
//       edges {
//         node {
//           portrait {
//             id
//             file {
//               url
//               fileName
//               contentType
//             }
//           }
//           headline1
//           headline2
//           shortBio
//           socialMedium
//           socialTwitter
//         }
//       }
//     }
//     contentAboutUs: allContentfulContentAbout {
//       edges {
//         node {
//           title
//           subtitle
//           missionandvision {
//             json
//           }
//           history {
//             json
//           }
//         }
//       }
//     }
//   }
