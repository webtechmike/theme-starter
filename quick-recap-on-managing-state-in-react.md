# A quick recap on managing state in React.
​
In this recap we're going to demonstrate a top-down data flow approach to managing state with React.  First we'll go over a couple approaches one might take and then we'll refactor to make things nicer and less likely to have bugs.
​
Let's say you want to add a button that, when clicked, will toggle your app between a `light` and `dark` style theme.
​
Let's start with a very simple App structure as shown below.
​
```
App 
  - Header
    - Logo
    - ThemeToggler
  - Body
  - Footer
```
​
As you can see our `ThemeToggler` component is nested two levels deep, first within `App` and then inside of `Header` and as a sibling to `Logo`.
​
For our theme to work we'll create a css class on our `App` component that will control whether or not our app is in light or dark mode and we'll take care of the rest with some styling.
​
```
`App.dark` or `App.light`
  - Header
    - Logo
    - ThemeToggler
  - Body
  - Footer
```
​
From here we can simply target the background and foreground colors.
​
```
$dark: #222;
$light: #eee;
​
.dark {
  background-color: $dark;
  color: $light;
}
​
.light {
  background-color: $light;
  color: $dark;
}
```
​
Now let's see how we can handle toggling between the two themes.  You're first instinct might be to simply find the app element and add or remove a class based on what is currently present.  Maybe something like this...
​
```
element.addEventListener('click', function() {
  let app = document.querySelector('.app');
​
  if( app.classList.contains('dark') ) {
    app.classList.remove('dark');
    app.classList.add('light');
  } else {
    app.classList.remove('light');
    app.classList.add('dark');
  }
});
```
​
_Ouch!_ or slightly easier to read with jQuery
​
```
$(element).on('click', function() {
  var $app = $('.app');
​
  // assumes app is initialized with one or the other
  $app.toggleClass('dark light');
});
```
​
Even with the more concise approach you can now imagine how the complexity will grow exponentially with more and more instances of this pattern.  This global app state is now controlled from within the nested toggle component.
​
This is a small example but if you can imagine dozens of these nested components all interacting with different pieces of global state while potentially causing side effects on one another, the difficulty to manage all of this increases as I'm sure most frontend developers are fairly familiar with this already.
​
Now let's update some things.  First let's look at how we can pull the if/elsey, side effecty logic out of our `ThemeToggle` component and make the toggle component a pure function.
​
```
const ThemeToggle = ({handleThemeToggle}) => (
  <div onClick={handleThemeToggle}></div>
)
```
​
By making this a presentational component, we no longer have to deal with what happens to our app when this toggle is clicked!  We just allow a click handler to be passed in as a prop then allow that handler to take care of whatever it wants to do from within its own usage.
​
In other words, whatever is using this component likely has more information on how it should be configured and our ThemeToggle component doesn't care what that is so it can be reusable.  It just maps to whatever is passed in.  Since the container component can access state, we'll deal with this one level up.
​
Now we can convert our App class component to a functional component as well and leverage the useState hook to manage state.
​
```
const [theme, setTheme] = useState('dark');
const handleThemeToggle = () => {
  setTheme(theme === 'dark' ? 'light' : 'dark');
}
```
​
```
<Header>
  <Logo />
  <ThemeToggle handleThemeToggle={handleThemeToggle} />
</Header>
```
​
Now our app is much cleaner and less bug prone.  All we do is read and write state.  If/when state ever changes the component will rerender and everything works as before but now it is much easier to identify what is happening and where things are being controlled; from the top down.
​
A challenge for you is to update this app to be able to handle more than just two themes.  For the full code to see one way I was able to make this work, download the app from [github](https://github.com/bergenmichael/theme-starter).
​
You'll notice some other optimizations going with this app.  To name a few, there are a couple more hooks introduced, [useEffect](https://reactjs.org/docs/hooks-effect.html) and [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback), as well as introducing [React.memo()](https://reactjs.org/docs/optimizing-performance.html). [useMemo()](https://reactjs.org/docs/hooks-reference.html#usememo)
​
If you have some advise or more ideas we can collaborate and build out some starter or sample apps that can save us time ramping up on new React projects and help us all learn.
​
Although, it _can be_ fun to put together projects from scratch, it will be nice to contribute toward standardizing and facilitating discussion around working concepts and best practices.  I know there are still some issues to work out with hooks like in dev tools and more advanced issues, but this should be an easy introduction to some nice patterns we can all build upon.