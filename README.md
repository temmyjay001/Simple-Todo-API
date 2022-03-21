# Serverless - Simple Todo API

###### In this exercise, i tried not to use any unnecessary library as this is a simple api


## Thoughts


Initially, while going through some materials on creating a serverless application, i created this api using a single file.

This file handles all of the function to be invoked. 
The entire crud operation. 

This approach was changed because the it couples the entire api together which doesn't give room for code reusablity and testabilty

Thereby causing a change in the project structure. 

```
[`your base directory`]
├─ .gitignore
├─ .prettierrc
├─ package.json
├─ package-lock.json
├─ serverless.yml
├─ src
│ ├─ core
│ │ ├─ jsonResponse.ts
│ │ ├─ handleError.ts
│ │ └─ HttpError.ts
│ ├─ database
│ │ ├─ db.ts
│ │ └─ services
│ │ ├─ index.ts
│ │ └─ postService.ts
│ ├─ dtos
│ │ ├─ createTodo.ts
│ │ └─ updateTodo.ts
| ├─ services
│ │ ├─ index.ts
│ │ └─ TodoService.ts
│ ├─ functions
│ │ ├─ createTodo.ts
│ │ ├─ deleteTodo.ts
│ │ ├─ getAllTodo.ts
│ │ ├─ getTodo.ts
│ │ └─ updateTodo.ts
│ └─ models
│ └─ Todo.ts
└─ tsconfig.json
```


# Features

### Create Todo
### Read Todo
### Update Todo
### Delete Todo


# Prerequisites

- [`serverless-framework`](https://github.com/serverless/serverless)
- [`node.js`](https://nodejs.org)
- [`Java Runtime Engine (JRE) version 6.x or newer`](https://www.java.com/en/download/)


## Deploy

### To Test It Locally

* Run ```npm install``` to install all the necessary dependencies.
* Run ```npm run local``` use serverless offline to test locally. 

### Deploy on AWS, simply run:

```
$ npm run deploy
# or
$ serverless deploy
```


