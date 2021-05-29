# PART 2 ( QUESTIONS )

##  What is the difference between Component and PureComponent? give an example where it might break my app.

A `PureComponent` is a regular `Component` in definition, what it's useful for (and the main difference) is that PureComponent manages the `shouldComponentUpdate` method for us rather than leaving a regular `Component` re-render everytime the parent renders / everytime an unneeded re-render is needed. If your `Component` in your app have some special effects for `shouldComponentUpdate` then using `PureComponent` will break your app because it will override the handling of `shouldComponentUpdate` by using a shallow comparison.

##  Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Depending on your effect on `shouldComponentUpdate`, you can do unnecessary re-renders by using `Context` in the same component since changes that are done in `Context` are not subject to the component update method. 

## Describe 3 ways to pass information from a component to its PARENT.

1 ) By declaring a function in the `parent` component to pass to the children as a `prop` and use the function in any effect in the `children` component and update `parent` component.

2 ) By declaring a `ref` in the children component and using the functions from the assigned component to the parent.

3 ) By using a `Context` or `Provider` wrapper for global state management.

## Give 2 ways to prevent components from re-rendering.

1 ) By using `React.memo` to memoize a children and prevent it from re-rendering if the props are the same.
2 ) By using `shouldComponentUpdate` to return `false`.

## What is a fragment and why do we need it? Give an example where it might break my app.

A `Fragment` is an "empty" element to let React wrap children elements without adding extra nodes to the DOM.
A really useful (and good example) on how `Fragment` can help you from breaking your app when trying to declare a `table` in your `JSX`.

For example, if you want to create a `Component` that returns multiple Children (which will have `<td>` as children elements) without adding the `<tr>` in the render, you would have to wrap them in a node that will make your HTML unvalid, you can fix by using `<></>` or `<React.Fragment></React.Fragment` to wrap them.

## Give 3 examples of the HOC pattern.

Sorry, I didn't understand the question. Maybe you wanted me to put 3 examples of widely-used HOC's?

##  what's the difference in handling exceptions in promises, callbacks and async...await.

The handling of exceptions is a good way to catch errors without crashing your app in case of an error from the callback or the promise.

Ideally, a Promise will return a `reject` status when an exception is catched internally, letting you use any effect for your app logic for managing the error.
If `reject` is not used, the exception can be catched in an outer scope of the function (from where it was called).
Using `async` and `await` you would have it to catch it directly. Using the `Promise.then(result,error)` error callback will let you know directly if there's an issue with the promise.

## How many arguments does setState take and why is it async.

`setState` can have up to 2 arguments, the first argument `updater` will receive an object with the properties to update the state of a component.
The second argument will receive a `callback` function that you want to execute when the setState is done. The callback is mainly used because `setState` is async and can occur in different times in a lifecycle of a method. If the `setState` wasn't asynchronous, the component would hang each time a state is being updated.

##  List the steps needed to migrate a Class to Function Component.

- Replace the `Class` declaration of the component by just declaring a function to return the rendered component, moving away `props` from the constructor, to parameters of the function.
- Replace the lifecycled methods such as `didComponentUpdate` and `setState` to `useEffect` and `useState` hooks.
- Rename and redirect the constants and variables that uses the `this` and re-declare these.
- If the component is way too complex on it's state management, instead of declaring different `useState` you can just create a big state object managed by only one `useState` (warning: can lead you to headaches if your component is complex in it's effects).
- Any logic for subscribing and memoizing can be redone as a custom `hook` or by using a `HOC` for expensive computations.


## List a few ways styles can be used with components.

1) By using in-line styles by declaring `style` objects in the element node.
2) By using `className` to assign a class for CSS. (It's easier with SASS/SCSS)
3) By using `styled-components` to use the benefits of ES6/JS with CSS.

##  How to render an HTML string coming from the server.

There are multiple ways but the best way is to sanitize manually a string to split it in different components.

If you really trust the source, you can also use `dangerouslySetInnerHTML` prop in an element to do this. 

Remember: `there's no good way ATM of this writing to know if the source will return a safe HTML`
