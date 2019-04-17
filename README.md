# Frontend Developer Coding Challenge

Hi! welcome to Feeld. As part of the recruitment process we want to know how you think, code and structure your work. In order to do that, we're going to ask you to complete this coding challenge.

## Some background

Feeld is a dating app. People are free to browse profiles and decide whether they like them or not.

## What we expect

* Build a performant, clean and well structured solution;
* Commit early and often. We want to be able to check your progress;
* Feel free to address the problem creatively according to your programming tastes (there are always multiple ways to achieve the same goal) and try to use elegant solutions.
* Feeld.co is a design-driven app. Your solution should look *modern, relevant, simple and in line with our brand image*
* Go the extra mile. The requirements below are just the bare minimum. Be creative and come up with a solution that will impress us. If you think our requirements are whack, or not appropriate, change them and explain why
* You have **one week** to complete this challenge

## The Challenge

Our backend team has created an API that will give you a bunch of user profiles, and you have been given some (very lose) requirements from the product team

* You must build an app that displays these users in an atractive way (think Tinder, Grindr, Happn, Hinge)
* The API will return the following information about a user:

```
{
    "id": "55be3c8fc964860700ebf515",
    "info": {
        "age": 20,
        "type": "single",
        "gender": "male",
        "sexuality": "straight",
        "name": "D",
        // a short text about them
        "about": "\"Tell us more about you\"",
        // a list of desires
        "desires": [
            "Food"
        ],
        // a list of tags they're interested in
        "interests": [
            "Food"
        ]
    },
    "associated": null, // if they're a couple, this will be populated
    "photos": [ // this will be a list of zero or more photos
        {
            "url": "...",
            "width": 716,
            "height": 716
        }
    ]
}
```

* A user should be able to make a decision (Like or Dislike) on the user, but they don't *have* to, i.e. they can skip the profile.
* The user should be able to browse another user's photos

## Accessing the API

API Root URL: https://fld-devtest-api.herokuapp.com

The API is authenticated using the following session token that must be supplied in the HTTP request headers (using the `session-token` key):

```
3TtY+AVtEJMaOPWGyEulVEgVBWZ8gqM75gag6wCcA3rJCYWMkX/ZmAOJxrZ4bPyBLJBch7VyMYD8ZCWoNPCUnJbT5M2iRWjJteGrfNhFzd+0oDbWQwiNAIdG0W9rHw7sKAAWk5uEzjs+lPykJnmy56LRwSFpoyxHC7p9G3KTQoQ=
```

### Endpoints

There's only one—`/api/v1/users`—which will return 20 unique users picked at random from a set of 100 users. You can call this endpoint using Curl as follows:

```
curl -H 'session-token: 3TtY+AVtEJMaOPWGyEulVEgVBWZ8gqM75gag6wCcA3rJCYWMkX/ZmAOJxrZ4bPyBLJBch7VyMYD8ZCWoNPCUnJbT5M2iRWjJteGrfNhFzd+0oDbWQwiNAIdG0W9rHw7sKAAWk5uEzjs+lPykJnmy56LRwSFpoyxHC7p9G3KTQoQ=' \
https://fld-devtest-api.herokuapp.com/api/v1/users
```

## Your task:

1. Fork this repo
2. Produce an expo React Native app that calls the provided API and displays users. Make it public and send us a link so we can open it
3. Create a readme file explaining your technical choices, architecture and if you have them, your ideas and suggestions.
4. Send us a PR.

GOOD LUCK!

## Notes

### Guide

You must have Node and Expo cli installed in your machine:

```
npm install -g expo-cli
```

Install dependencies:

```
npm ci
```

Run the project:

```
npm start
```

### Other commands

Unit test:

```
npm test
```

Unit test coverage report:

```
npm run test:coverage
```

Lint:

```
npm run lint
```

### Libraries

- `redux` is the state management library, it's easy to understand and is a well known solution, it simplifies state management removing the dependecy on local states.
- `reselect` is a nice combo with redux, you get memoization for free and it makes easy composing and deriving data from your state.
- `react-redux` tool belt to connect redux with react.
- `redux-observable` a middleware to combine the power of rxjs with redux to handle side effects.
- `rxjs` reactive extensions for javascript, handling async processing without pain, it's one of the best solutions to handle async processing.
- `styled-components`  with Native makes your code cleaner, also you can keep writing css-like meanwhile you have the ability to use them on web without any pain.

### Tech choices and solutions

- Project structure is pretty basic since the project is small, I could also group containers/components/helpers on domains instead per type of element.
- Styled components always live within a folder called styled, this way is easy to search for specific components and folders are more clean of elements.
- Components and containers are splited, containers are really limited to connect with redux state, that's why they always expose render props.
- Injectors allows the developer to inject reducers and epics on demand, this way initializing the store is a lightweight process.
- There are two containers, one is simply for fetching and storing the data, the other is responsible for handling the actions, this way we can use selectors and derive data, so we keep the state at minimum with less mutations, also allows developer more freedom to reuse or replace them.

### Ideas

- List element is using ScrollView, problem is that FlatList is too buggy on this version, so performance is a huge concern if the list is long.
- Animations can be also improved, it takes time to refine them so that's why this are simple showcases.
- Expo is a very limited option, it's nice as starter but in the long term is not an option, for example not having the option to update React Native.
