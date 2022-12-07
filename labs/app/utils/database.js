let db = {
    articles: [
      {
        id: '1',
        title: 'My article 1',
        content: 'Content of my article.',
        date: '04/10/2022',
        author: 'Liz Gringer'
      },
      {
          id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
          title: 'Article 2',
          content: 'Content of the article 2.',
          date: '04/10/2022',
          author: 'Liz Gringer'
        },
        {
          id: '3',
          title: 'Article 3',
          content: 'Content of the article 3.',
          date: '04/10/2022',
          author: 'Liz Gringer'
        },
        {
          id: '4',
          title: 'Article 4',
          content: 'Content of the article 4.',
          date: '04/10/2022',
          author: 'Liz Gringer'
        },
        {
          id: '5',
          title: 'Article 5',
          content: 'Content of the article 5.',
          date: '04/10/2022',
          author: 'Liz Gringer'
        },
        {
          id: '6',
          title: 'Article 6',
          content: 'Content of the article 6',
          date: '04/10/2022',
          author: 'Liz Gringer'
        },
        {
          id: '7',
          title: 'Article 7',
          content: 'Content of the article 7',
          date: '04/10/2022',
          author: 'Liz Gringer'
        },
      // ...
    ],
    comments: [
      {
        id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        timestamp: 1664835049,
        content: 'Content of the comment 1.',
        articleId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        author: 'Bob McLaren'
      },
      {
        id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        timestamp: 1664835049,
        content: 'Content of the comment 2.',
        articleId: '1',
        author: 'Bob McLaren'
      },
      {
        id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        timestamp: 1664835049,
        content: 'Content of the comment 3.',
        articleId: '1',
        author: 'Thomas'
      },
      // ...
    ]
  }

  export default db