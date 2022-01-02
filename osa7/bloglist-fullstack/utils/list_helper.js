const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}
  let best = blogs[0]
  for (const e of blogs) {
    if (e.likes > best.likes) {
      best = e
    }
  }
  /* console.log(best) */
  return best
}

const mostBlogs = (blogs) => {
  let amounts = {}
  for (const e of blogs) {
    if (e.author in amounts) {
      amounts[e.author] += 1
    }
    else {
      amounts[e.author] = 1
    }
  }
  const maxAuthor = Object.keys(amounts).reduce((prev, current) => {
    return (amounts[prev] > amounts[current]) ? prev : current
  })
  const result = {
    'author': maxAuthor,
    'blogs': amounts[maxAuthor]
  }
  console.log(result)
  return result

}
const mostLikes = (blogs) => {
  let amounts = {}
  for (const e of blogs) {
    if (e.author in amounts) {
      amounts[e.author] += e.likes
    }
    else {
      amounts[e.author] = e.likes
    }
  }
  const maxAuthor = Object.keys(amounts).reduce((prev, current) => {
    return (amounts[prev] > amounts[current]) ? prev : current
  })
  const result = {
    'author': maxAuthor,
    'likes': amounts[maxAuthor]
  }
  console.log(result)
  return result

}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}