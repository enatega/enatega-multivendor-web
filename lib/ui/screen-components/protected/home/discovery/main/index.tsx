import SliderCard from "@/lib/ui/useable-components/slider-card";

export default function DiscoveryMain() {
  const dealsData = [
    {
      name: "KFC - Central",
      category: "Fast Food",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/3/3a/KFC_Zinger_combo_meal.jpg",
      deliveryTime: "12-25 min",
      time: "30 mins",
      reviews: "5.2k",
      rating: "9.2",
    },
    {
      name: "Pizza Hot 3",
      category: "Fast Food 3",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d3/Supreme_pizza.jpg",
      deliveryTime: "15-30 min",
      time: "35 mins",
      reviews: "3.8k",
      rating: "8.7",
    },
    {
      name: "McDonald's Deluxe",
      category: "Fast Food",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/McDonald%27s_Big_Mac_Combo.jpg/800px-McDonald%27s_Big_Mac_Combo.jpg",
      deliveryTime: "10-20 min",
      time: "25 mins",
      reviews: "6.5k",
      rating: "9.0",
    },
    {
      name: "Burger King Flame",
      category: "Fast Food",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/4d/Burger_King_meal.jpg",
      deliveryTime: "20-35 min",
      time: "40 mins",
      reviews: "4.9k",
      rating: "8.5",
    },
    {
      name: "Subway Fresh",
      category: "Fast Food",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/54/Subway_sandwich.jpg",
      deliveryTime: "10-15 min",
      time: "20 mins",
      reviews: "7.1k",
      rating: "9.3",
    },

    {
      name: "Taco Bell Fiesta",
      category: "Mexican Fast Food",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6a/Taco_Bell_menu_items.jpg",
      deliveryTime: "15-20 min",
      time: "25 mins",
      reviews: "4.2k",
      rating: "8.8",
    },
    {
      name: "Domino's Special",
      category: "Pizza",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/3/3a/Domino%27s_pizza.jpg",
      deliveryTime: "20-30 min",
      time: "35 mins",
      reviews: "6.3k",
      rating: "9.0",
    },
    {
      name: "Five Guys Burger",
      category: "American Fast Food",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/3/33/Five_Guys_Burgers.jpg",
      deliveryTime: "10-20 min",
      time: "30 mins",
      reviews: "5.7k",
      rating: "9.1",
    },
    {
      name: "Wendy's Classic",
      category: "Fast Food",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/3/3f/Wendy%27s_burger_meal.jpg",
      deliveryTime: "12-22 min",
      time: "28 mins",
      reviews: "3.9k",
      rating: "8.6",
    },
    {
      name: "Popeyes Chicken",
      category: "Fast Food",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/9f/Popeyes_chicken_meal.jpg",
      deliveryTime: "15-25 min",
      time: "32 mins",
      reviews: "5.1k",
      rating: "8.9",
    },
    {
      name: "Chipotle Bowl",
      category: "Mexican Fast Food",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/e/e2/Chipotle_Burrito_Bowl.jpg",
      deliveryTime: "10-15 min",
      time: "22 mins",
      reviews: "4.8k",
      rating: "9.2",
    },
    {
      name: "Dairy Queen Treat",
      category: "Desserts & Ice Cream",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/b/bd/Dairy_Queen_Blizzard.jpg",
      deliveryTime: "5-10 min",
      time: "15 mins",
      reviews: "3.5k",
      rating: "8.4",
    },
    {
      name: "Krispy Kreme Donuts",
      category: "Bakery & Desserts",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/df/Krispy_Kreme_doughnuts.jpg",
      deliveryTime: "5-15 min",
      time: "18 mins",
      reviews: "6.2k",
      rating: "9.5",
    },
    {
      name: "Starbucks Coffee",
      category: "Coffee & Beverages",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/4b/Starbucks_coffee_cups.jpg",
      deliveryTime: "5-10 min",
      time: "12 mins",
      reviews: "8.3k",
      rating: "9.6",
    },
    {
      name: "Shake Shack Burger",
      category: "Fast Food",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d1/Shake_Shack_Burger.jpg",
      deliveryTime: "12-18 min",
      time: "26 mins",
      reviews: "5.9k",
      rating: "9.0",
    },
  ];

  return <SliderCard title="Top Deals" data={dealsData} />;
}
