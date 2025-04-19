import type { MenuItem } from "@/types/menu"

export const coffeeMenu: MenuItem[] = [
  {
    id: "coffee-1",
    name: "SIGNATURE ESPRESSO",
    description: "Our house blend, featuring notes of chocolate, caramel, and a hint of citrus.",
    price: "$4.50",
    image: "/images/coffee-1.png",
    badges: ["Signature", "House Blend"],
  },
  {
    id: "coffee-2",
    name: "POUR OVER",
    description: "Single-origin coffee prepared using the pour-over method for maximum flavor extraction.",
    price: "$5.50",
    image: "/images/coffee-2.png",
    badges: ["Single Origin"],
  },
  {
    id: "coffee-3",
    name: "CAPPUCCINO",
    description: "Espresso with steamed milk and a generous layer of foam, perfectly balanced.",
    price: "$5.00",
    image: "/images/coffee-1.png",
  },
  {
    id: "coffee-4",
    name: "FLAT WHITE",
    description: "A rich espresso with velvety steamed milk, offering a stronger coffee flavor than a latte.",
    price: "$5.00",
    image: "/images/coffee-2.png",
  },
  {
    id: "coffee-5",
    name: "COLD BREW",
    description: "Coffee steeped for 24 hours in cold water, resulting in a smooth, low-acidity brew.",
    price: "$5.50",
    image: "/images/coffee-1.png",
  },
  {
    id: "coffee-6",
    name: "AFFOGATO",
    description: "A scoop of vanilla gelato 'drowned' with a shot of hot espresso.",
    price: "$6.50",
    image: "/images/coffee-2.png",
    badges: ["Contains Dairy"],
  },
]

export const breakfastMenu: MenuItem[] = [
  {
    id: "breakfast-1",
    name: "AVOCADO TOAST",
    description: "Sourdough toast topped with smashed avocado, poached eggs, and microgreens.",
    price: "$14.00",
    image: "/images/food-1.png",
    badges: ["Vegetarian"],
  },
  {
    id: "breakfast-2",
    name: "FRENCH TOAST",
    description: "Brioche bread soaked in vanilla custard, grilled to perfection, served with maple syrup and berries.",
    price: "$16.00",
    image: "/images/food-2.png",
    badges: ["Vegetarian"],
  },
  {
    id: "breakfast-3",
    name: "EGGS BENEDICT",
    description: "Poached eggs on English muffin with hollandaise sauce and your choice of ham or smoked salmon.",
    price: "$18.00",
    image: "/images/food-1.png",
  },
  {
    id: "breakfast-4",
    name: "GRANOLA BOWL",
    description: "House-made granola with Greek yogurt, fresh fruits, honey, and chia seeds.",
    price: "$12.00",
    image: "/images/food-2.png",
    badges: ["Vegetarian"],
  },
]

export const lunchMenu: MenuItem[] = [
  {
    id: "lunch-1",
    name: "QUINOA SALAD",
    description: "Mixed greens, quinoa, roasted vegetables, feta cheese, and lemon vinaigrette.",
    price: "$16.00",
    image: "/images/food-1.png",
    badges: ["Vegetarian", "Gluten-Free"],
  },
  {
    id: "lunch-2",
    name: "GOURMET BURGER",
    description: "Grass-fed beef patty, aged cheddar, caramelized onions, and special sauce on a brioche bun.",
    price: "$19.00",
    image: "/images/food-2.png",
  },
  {
    id: "lunch-3",
    name: "GRILLED CHICKEN SANDWICH",
    description: "Herb-marinated chicken breast with avocado, bacon, lettuce, and aioli on ciabatta.",
    price: "$17.00",
    image: "/images/food-1.png",
  },
  {
    id: "lunch-4",
    name: "MEDITERRANEAN PLATE",
    description: "Hummus, baba ganoush, tabbouleh, olives, and warm pita bread.",
    price: "$15.00",
    image: "/images/food-2.png",
  },
]

export const dinnerMenu: MenuItem[] = [
  {
    id: "dinner-1",
    name: "FILET MIGNON",
    description: "8oz grass-fed beef tenderloin, truffle mashed potatoes, and seasonal vegetables.",
    price: "$38.00",
    image: "/images/food-1.png",
    badges: ["Signature"],
  },
  {
    id: "dinner-2",
    name: "PAN-SEARED SALMON",
    description: "Wild-caught salmon with quinoa pilaf, roasted asparagus, and lemon butter sauce.",
    price: "$32.00",
    image: "/images/food-2.png",
    badges: ["Gluten-Free"],
  },
  {
    id: "dinner-3",
    name: "MUSHROOM RISOTTO",
    description: "Arborio rice slowly cooked with wild mushrooms, white wine, and Parmesan cheese.",
    price: "$24.00",
    image: "/images/food-1.png",
    badges: ["Vegetarian"],
  },
  {
    id: "dinner-4",
    name: "RACK OF LAMB",
    description: "Herb-crusted lamb rack with rosemary jus, potato gratin, and glazed carrots.",
    price: "$42.00",
    image: "/images/food-2.png",
  },
]

export const dessertsMenu: MenuItem[] = [
  {
    id: "dessert-1",
    name: "CHOCOLATE SOUFFLÉ",
    description: "Warm chocolate soufflé with a molten center, served with vanilla bean ice cream.",
    price: "$12.00",
    image: "/images/food-2.png",
    badges: ["Signature"],
  },
  {
    id: "dessert-2",
    name: "CRÈME BRÛLÉE",
    description: "Classic vanilla custard with a caramelized sugar crust and fresh berries.",
    price: "$10.00",
    image: "/images/food-1.png",
    badges: ["Gluten-Free"],
  },
  {
    id: "dessert-3",
    name: "TIRAMISU",
    description: "Layers of coffee-soaked ladyfingers and mascarpone cream, dusted with cocoa.",
    price: "$11.00",
    image: "/images/food-2.png",
  },
  {
    id: "dessert-4",
    name: "SEASONAL FRUIT TART",
    description: "Buttery pastry shell filled with vanilla custard and topped with glazed seasonal fruits.",
    price: "$10.00",
    image: "/images/food-1.png",
  },
]
