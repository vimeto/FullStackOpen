Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ author, title, url }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: {
      author,
      title,
      url
    },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})

describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'rootuser',
      username: 'root',
      password: '12345678'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('blogs')
    cy.contains('You must log in to add new notes')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
    cy.contains('username')
    cy.contains('password')
  })

  it('user can log in', function() {
    cy.contains('log in').click()
    cy.get('#login-username').type('root')
    cy.get('#login-password').type('12345678')
    cy.get('#login-button').click()

    cy.contains('rootuser logged in')
  })

  it('login fails with wrong credentials', function() {
    cy.contains('log in').click()
    cy.get('#login-username').type('root')
    cy.get('#login-password').type('vaarasalasana')
    cy.get('#login-button').click()

    cy.get('.main-info-message')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'border-style', 'solid')
      .and('have.css', 'border-color', 'rgb(255, 0, 0)')

    cy.get('html').should('not.contain', 'rootuser logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: '12345678' })
    })

    it('a blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#form-author').type('The best author')
      cy.get('#form-title').type('parasblogi')
      cy.get('#form-url').type('google.com/hmm')
      cy.get('#form-submit').click()

      cy.get('html').should('contain', 'parasblogi')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          author: 'Vilhelm Toivonen',
          title: 'FullStackOPen propaganda',
          url: 'www.google.com/google.comld'
        })
        cy.createBlog({
          author: 'Vilhelm aasdf',
          title: 'asdfa propaganda',
          url: 'www.google.asfdaadf/google.comld'
        })
        cy.createBlog({
          author: 'sdfa aasdf',
          title: 'asdfasda propaganda',
          url: 'www.asdfasdfasf.asfdaadf/google.comld'
        })
      })
      it('it can be made important', function() {
        cy.get('#blog-title')
          .contains('view')
          .click()
        cy.get('.blog-expandable')
          .contains('like')
          .click()
        cy.get('.blog-expandable')
          .contains('likes 1')
      })
      it('user can delete their own posts', function() {
        cy.get('#blog-title')
          .contains('view')
          .click()
        cy.get('.blog-expandable')
          .contains('remove')
          .click()
        cy.on('window:confirm', () => true)
        cy.get('html').find('.blog-master-class').should('have.length', 2)
      })
      it('the posts are ranked based on likes', function() {
        cy.get('.blog-master-class').eq(0).as('first')
        cy.get('.blog-master-class').eq(1).as('second')
        cy.get('.blog-master-class').eq(2).as('third')
        cy.get('@third').contains('view').click().parent().parent().contains('like').click()
        /* Should have moved to the the top position, all others have likes 0 because they have been initialized with likes 0 */
        cy.get('.blog-master-class').eq(0).should('contain', 'likes 1')
        cy.get('@second').contains('view').click().parent().parent().contains('like').click().click()
        /* Now first element (originally second child) should have 2 likes */
        cy.get('.blog-master-class').eq(0).should('contain', 'likes 2')
        cy.get('.blog-master-class').eq(1).should('contain', 'likes 1')
        cy.get('@first').contains('view').click().parent().parent().contains('like').click()
        cy.get('@first').contains('like').click()
        cy.get('@first').contains('like').click()
        /* Now they should be in the initial order, but with 3, 2, 1 likes */
        cy.get('.blog-master-class').eq(0).should('contain', 'likes 3')
        cy.get('.blog-master-class').eq(1).should('contain', 'likes 2')
        cy.get('.blog-master-class').eq(2).should('contain', 'likes 1')
        /* It is very likely that with the sorting works on larger datasets also */

      })
    })
  })
})