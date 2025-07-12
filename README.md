Области хранения данных
-база данных на json-server
-BFF
-Redux store

Сущности приложения
-пользователь: БД, BFF (сессия текущего), store (отображение в браузере)
-роль пользователя: БД (список ролей), BFF (сессия пользователей с ролью), store (использование на клиенте)
-статья: БД (список статей), store (отображение в браузере)
-комментарий: БД (список комментариев), store (отображение в браузере)

Таблицы БД:
-пользователи - users: id / login /!password/ registed_at / role_id
-роли -roles: id/ name
-статьи -posts: id/title/image_url/ content/ published_at
-комментарии -comments: id/author_id/ post_id / content

Схема состояния на BFF:
-сессия текущего пользователя: login/password/role
 
 Схема для Redux store (на клиенте):
 -user: id/login/roledID
 -posts: массив со статьями: id / title / imageURL/ publishedAt/commentsCount
-post: id / title / imageURL/content /publishedAt/comments:массив comment: id/author/content/ publishedAt
-users: массив user: id/login/registeredAt/role

/* comments: {
      "id": "001",
      "post_id": "001",
      "user_id": "001",
      "content": "Great article! I love how you highlighted the importance of AI in enhancing human capabilities. It's exciting to see how technology can empower us rather than replace us.",
      "created_at": "2023-10-06"
    },
    {
      "id": "002",
      "post_id": "002",
      "user_id": "001",
      "content": "The future of work is indeed changing rapidly. I appreciate your insights on the importance of mental health in the workplace. It's crucial for companies to prioritize employee well-being.",
      "created_at": "2023-11-16"
    } */