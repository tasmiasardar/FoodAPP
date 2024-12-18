import React from 'react';
import "./HomePage.css";
import { useMealContext } from '../../context/mealContext';
import Loader from "../../components/Loader/Loader";
import CategoryList from "../../components/Category/CategoryList";
import Form from "../../components/Form/Form";

import MealList from "../../components/Meal/MealList";

const HomePage = () => {
  const {categories, meals, categoryLoading, mealsLoading} = useMealContext();

  return (
    <main className='main-content'>
      { (mealsLoading) ? <Loader /> : (meals === null)? <Form /> : (meals?.length) ? <MealList meals = {meals} /> : "" }
      { (categoryLoading) ? <Loader /> : <CategoryList categories = {categories} /> }
    </main>
  )
}

export default HomePage;
