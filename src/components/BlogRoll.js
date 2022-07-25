import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class BlogRollTemplate extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Wrapper>
        <div className="container posts-list">
          <div className="row">
            {posts &&
              posts.map(({ node: post }) => (
                <div className="is-parent column col-12 col-md-6" key={post.id}>
                  <article
                    className={`blog-list-item tile is-child box notification ${
                      post.frontmatter.featuredpost ? 'is-featured' : ''
                    }`}
                  >
                    <header>
                      {/* Blog thumbnail. Currently disabled */}
                      {/* <Link
                      className=""
                      to={post.fields.slug}
                    >
                      {post.frontmatter.featuredimage ? (
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                          
                          height: 160
                        }}
                      />
                    </div>
                  ) : null}
                    </Link> */}

                      <h3 className="post-meta">
                        <Link className="" to={post.fields.slug}>
                          {post.frontmatter.title}
                        </Link>
                        {/* <span> &bull; </span> */}
                        <span className="subtitle is-size-5 is-block">
                          {post.frontmatter.date}
                        </span>
                      </h3>
                    </header>
                    <p className="excerpt">{post.excerpt}</p>
                    <Link className="button-solid" to={post.fields.slug}>
                      Keep Reading →
                    </Link>
                  </article>
                </div>
              ))}
          </div>
        </div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  .blog-list-item {
    padding: 2rem;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.25);
    margin-bottom: 1rem;
  }

  .posts-list {
    margin: 2rem auto;
  }
  .blog-list-item .featured-thumbnail {
    flex-basis: 35%;
    margin: 0 1.5em 0 0;
  }

  .blog-list-item header {
    display: flex;
    margin-bottom: 1.5em;
  }

  .post-meta {
    display: flex;
    flex-direction: column;
  }

  .post-meta a {
    font-weight: 500;
    color: var(--primary-dark);
    font-size: 1.4em;
  }

  .post-meta span {
    font-weight: 500;
    font-size: 90%;
    opacity: 0.8;
  }

  header {
    align-items: baseline;
  }

  .excerpt {
    margin-bottom: 1.5rem;
  }

  @media only screen and (max-width: 430px) {
    .blog-list-item {
  padding: 1.4rem;
  margin-bottom: 1.4rem;
}
    .post-meta {

      a{
        font-weight: 500;
  color: var(--primary-dark);
  font-size: 1em;
  margin-bottom: .5em;
      }
  span{
    font-size: 70%;
  }
}
.excerpt{
  font-size: 1em;
}
  }
`

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default function BlogRoll() {
  return (
    <StaticQuery
      query={graphql`
        query BlogRollQuery {
          allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 400)
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  templateKey
                  featuredimage
                  date(formatString: "MMM DD, YYYY")
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <BlogRollTemplate data={data} count={count} />}
    />
  )
}
