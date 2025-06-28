import React, { useState } from "react";
import "./App.css";

// Mocked recipe data
const RECIPES = [
  {
    id: 1,
    name: "Classic Spaghetti Bolognese",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    description:
      "A hearty Italian classic with a rich and savory meat sauce served over al dente spaghetti.",
    ingredients: [
      "400g spaghetti",
      "2 tbsp olive oil",
      "1 onion, chopped",
      "2 garlic cloves, minced",
      "400g ground beef",
      "400g canned tomatoes",
      "2 tbsp tomato paste",
      "1 tsp dried oregano",
      "Salt & pepper",
      "Parmesan cheese, to serve"
    ],
    instructions: [
      "Cook spaghetti according to package instructions.",
      "Meanwhile, heat olive oil in a pan, sauté onion and garlic until soft.",
      "Add ground beef, cook until browned.",
      "Stir in tomatoes, tomato paste, oregano, salt, and pepper. Simmer for 15 minutes.",
      "Serve sauce over drained spaghetti and top with Parmesan."
    ]
  },
  {
    id: 2,
    name: "Lemon Herb Grilled Chicken",
    image:
      "https://images.unsplash.com/photo-1514512364185-4c2fd2a4dd79?auto=format&fit=crop&w=600&q=80",
    description:
      "Juicy grilled chicken breasts marinated in fresh lemon juice and herbs, perfect for a light dinner.",
    ingredients: [
      "2 chicken breasts",
      "2 tbsp olive oil",
      "Juice of 1 lemon",
      "1 tsp dried thyme",
      "1 tsp dried oregano",
      "1 garlic clove, minced",
      "Salt & pepper"
    ],
    instructions: [
      "Mix olive oil, lemon juice, herbs, garlic, salt, and pepper in a bowl.",
      "Add chicken and marinate for 30 minutes.",
      "Heat grill or grill pan, cook chicken 5-7 min each side or until cooked through.",
      "Slice and serve with extra lemon wedges."
    ]
  },
  {
    id: 3,
    name: "Avocado Toast with Poached Egg",
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80",
    description:
      "Crunchy toast topped with creamy avocado and a perfect poached egg—a healthy breakfast favorite.",
    ingredients: [
      "2 slices whole grain bread",
      "1 ripe avocado",
      "2 eggs",
      "1 tbsp vinegar",
      "Salt & pepper",
      "Chili flakes (optional)"
    ],
    instructions: [
      "Toast the bread slices to desired doneness.",
      "Mash avocado with salt and pepper, spread onto toast.",
      "Bring water with vinegar to a simmer, crack in eggs and poach for 3-4 minutes.",
      "Drain eggs, place on toast. Sprinkle chili flakes if desired."
    ]
  },
  {
    id: 4,
    name: "Vegetarian Chili",
    image:
      "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=600&q=80",
    description:
      "A spicy, satisfying chili loaded with beans, veggies, and warming spices—comfort food with a kick.",
    ingredients: [
      "1 tbsp olive oil",
      "1 onion, diced",
      "2 bell peppers, chopped",
      "2 garlic cloves, minced",
      "2 cans kidney beans, drained",
      "1 can diced tomatoes",
      "2 tbsp tomato paste",
      "1 tbsp chili powder",
      "1 tsp cumin",
      "Salt & pepper"
    ],
    instructions: [
      "Heat oil in a pot, sauté onion, peppers, and garlic until soft.",
      "Add beans, tomatoes, tomato paste, chili powder, and cumin.",
      "Simmer for 25 minutes, stirring occasionally.",
      "Season to taste and serve hot."
    ]
  },
  {
    id: 5,
    name: "Chocolate Chip Banana Bread",
    image:
      "https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=600&q=80",
    description:
      "Moist banana bread packed with chocolate chips, perfect as a snack or for breakfast.",
    ingredients: [
      "3 ripe bananas",
      "1/2 cup melted butter",
      "1/2 cup sugar",
      "2 eggs",
      "1 tsp vanilla extract",
      "1 1/2 cups flour",
      "1 tsp baking soda",
      "1/2 tsp salt",
      "3/4 cup chocolate chips"
    ],
    instructions: [
      "Preheat oven to 175°C (350°F). Grease a loaf pan.",
      "Mash bananas. Mix with melted butter, sugar, eggs, and vanilla.",
      "Add flour, baking soda, and salt. Mix gently.",
      "Fold in chocolate chips. Pour batter into pan.",
      "Bake for 50-55 minutes. Cool before slicing."
    ]
  }
];

// Theme & color palette
const COLOR = {
  accent: "#e67e22",
  primary: "#27ae60",
  secondary: "#2c3e50",
  lightBg: "#fff",
  lightText: "#222",
  border: "#e9ecef"
};

// Header component
function Header({ onSearch, searchValue }) {
  return (
    <header className="header">
      <nav className="nav">
        <span className="brand">
          <span role="img" aria-label="chef hat" className="logo">
            👩‍🍳
          </span>
          Recipe Explorer
        </span>
        <div className="search-bar">
          <label htmlFor="search-input" className="sr-only">
            Search recipes
          </label>
          <input
            id="search-input"
            className="search-input"
            type="text"
            placeholder="Search recipes..."
            value={searchValue}
            onChange={e => onSearch(e.target.value)}
            autoFocus
          />
        </div>
      </nav>
    </header>
  );
}

// Recipe Card
function RecipeCard({ recipe, onClick }) {
  return (
    <div className="recipe-card" onClick={() => onClick(recipe)}>
      <img
        src={recipe.image}
        alt={recipe.name}
        className="recipe-image"
        loading="lazy"
      />
      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.name}</h3>
        <p className="recipe-desc">{recipe.description}</p>
      </div>
    </div>
  );
}

// Recipe Modal
function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          ×
        </button>
        <img src={recipe.image} alt={recipe.name} className="modal-image" />
        <h2 className="modal-title">{recipe.name}</h2>
        <p className="modal-desc">{recipe.description}</p>

        <div className="modal-section">
          <h3>Ingredients</h3>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </div>
        <div className="modal-section">
          <h3>Instructions</h3>
          <ol className="instructions-list">
            {recipe.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
}

// Footer component
function Footer() {
  return (
    <footer className="footer">
      <span>
        &copy; {new Date().getFullYear()} Recipe Explorer &middot; Made with
        <span style={{ color: COLOR.accent, margin: "0 0.25em" }}>♥</span>
        Modern React
      </span>
      <a
        href="https://react.dev/"
        className="footer-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        React Docs
      </a>
    </footer>
  );
}

// Recipe List
function RecipeList({ recipes, onRecipeClick }) {
  if (recipes.length === 0)
    return (
      <div className="empty-state">
        <span role="img" aria-label="empty">
          🙁
        </span>
        No recipes found.
      </div>
    );
  return (
    <div className="recipes-grid">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} onClick={onRecipeClick} />
      ))}
    </div>
  );
}

// Main App
// PUBLIC_INTERFACE
function App() {
  const [search, setSearch] = useState("");
  const [modalRecipe, setModalRecipe] = useState(null);

  // Filter recipes by search
  const filteredRecipes =
    search.trim().length === 0
      ? RECIPES
      : RECIPES.filter(r =>
          r.name.toLowerCase().includes(search.trim().toLowerCase())
        );

  return (
    <div className="app-root" style={{ background: COLOR.lightBg, color: COLOR.lightText }}>
      <Header onSearch={setSearch} searchValue={search} />
      <main className="main-content">
        <RecipeList recipes={filteredRecipes} onRecipeClick={setModalRecipe} />
        <RecipeModal
          recipe={modalRecipe}
          onClose={() => setModalRecipe(null)}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
