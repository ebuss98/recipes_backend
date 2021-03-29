# Backend API description

## **Get recipes**

Returns json array of recipes.

- **URL**

  /recipes

- **Method:**

  `GET`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    [
      {
        "_id": "60600398781c7b9570a37e65",
        "name": "Pizza",
        "createdAt": 1616905112077,
        "ingredients": ["Cheese", "Ketchup", "Higg's boson", "Meat"],
        "description": "Some nice pizza recipe",
        "scores": { "46033875": 1, "112609182": 5, "255465165": 5 },
        "userId": 112609182,
        "numberOfComments": 3
      }
    ]
    ```

- **Error Response:**

  None

## **Get recipes**

Returns json array of recipe's comments.

- **URL**

  /comments

- **Method:**

  `GET`

* **URL Params**
  **Required:**

  `recipeId=[string]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    [
      {
        "userId": 112609182,
        "text": "Nice Pizza!",
        "createdAt": 1616925419266,
        "user": {
          "_id": "606001dc781c7b9570a37e62",
          "id": 112609182,
          "name": "Илья Мясников",
          "avatar": "https://sun9-63.userapi.com/s/v1/if1/yC3RdRlboR9ZGQhKKDHFjb6TT95OCev2nlm64WaSbJBrtcqZP1xD2FrIiT-d9xANzCH2ZgaB.jpg?size=200x0&quality=96&crop=984,716,708,708&ava=1"
        }
      },
      {
        "userId": 46033875,
        "text": "Yes, delitios!",
        "createdAt": 1616905166736,
        "user": {
          "_id": "60600342781c7b9570a37e64",
          "id": 46033875,
          "name": "Евгений Бусс",
          "avatar": "https://sun9-25.userapi.com/s/v1/if1/Unic80flXLmpgspH3bQXM3p_S8TAxV0VmW2pE09OFD46nLfuQsm30q3zPdkrTMgwSy1dC4y_.jpg?size=200x0&quality=96&crop=0,227,978,978&ava=1"
        }
      }
    ]
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />

## **Post recipe**

Create a recipe.

- **URL**

  /recipe

- **Method:**

  `POST`

- **Data Params**

  ```json
  {
    "name": "Pizza",
    "ingredients": ["Cheese", "Ketchup", "Higg's boson", "Meat"],
    "description": "Nice",
    "userId": "123413582"
  }
  ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**

    ```json
    {
      "_id": "60600398781c7b9570a37e65",
      "name": "Pizza",
      "createdAt": 1616905112077,
      "ingredients": ["Cheese", "Ketchup", "Higg's boson", "Meat"],
      "description": "Some nice pizza recipe",
      "scores": { "46033875": 1, "112609182": 5, "255465165": 5 },
      "userId": 112609182,
      "numberOfComments": 3
    }
    ```

- **Error Response:**

  None

## **Post comment**

Create a comment under a recipe.

- **URL**

  /comment

- **Method:**

  `POST`

- **Data Params**

  ```json
  {
    "recipeId": "60600398781c7b9570a37e65",
    "text ": "Yes, delitios!",
    "userId": 112609182
  }
  ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**

    ```json
    {
      "text ": "Yes, delitios!",
      "createdAt": 1616905112077,
      "userId": 112609182
    }
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />

## **Post score**

Rate a recipe by adding a score to it.

- **URL**

  /score

- **Method:**

  `POST`

- **Data Params**

  ```json
  {
    "recipeId": "60600398781c7b9570a37e65",
    "score ": 4,
    "userId": 112609182
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />

## **Delete recipe**

Delete a recipe with all it's comments and score's.

- **URL**

  /recipe/:id

- **Method:**

  `DELETE`

- **Success Response:**

  - **Code:** 200 <br />

- **Error Response:**

  - **Code:** 500 INTERNAL SERVICE ERROR <br />
