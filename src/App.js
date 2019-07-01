import React,{ useEffect,useState } from 'react'; 
import Recipe from './Recipe';
import './App.css';


const App = () =>{
const APP_ID = "0351c3be";
const APP_KEY = "011993ea2863fa1c8c48b208ca637b1b";

const [recipes,setRecipes] = useState([]);
const [search, setSearch] = useState("");
const [query, setQuery] = useState("chicken")


useEffect(()=>{
getrecipes();
}, [query]);

const getrecipes = async ()=>{
const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
const data = await response.json();
setRecipes(data.hits);
}

const updateSearch = event => {
  setSearch(event.target.value);
  
}

const getSearch = e =>{
  e.preventDefault()
  //prevent default method is called to stop refreshing the page
  setQuery(search);
  setSearch("");
}




  return(
<div className = "App">
<form onSubmit={getSearch} className = "search-form">
  <input className="search-bar" type="text" value ={search} onChange={updateSearch}/>
 <button className="search-button" type = "submit">Search</button>
</form>
{recipes.map(recipe =>(
  <Recipe 
        key ={recipe.recipe.label}
        title = {recipe.recipe.label} 
         calories = {recipe.recipe.calories}
          image = {recipe.recipe.image}
          ingredients = {recipe.recipe.ingredients}/>
))};
</div>
  );

  
}





export default App;
