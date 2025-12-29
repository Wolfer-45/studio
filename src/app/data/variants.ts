export type Ingredient = {
  name: string;
};

export type NutritionFact = {
  label: string;
  value: string;
  unit: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Review = {
  name: string;
  title: string;
  comment: string;
  rating: number;
  avatarId: string;
};

export type Variant = {
  name: string;
  subtitle: string;
  description: string;
  themeColor: string;
  themeColorDark: string;
  image: {
    baseUrl: string;
    frameCount: number;
  };
  ingredients: Ingredient[];
  nutrition: NutritionFact[];
};

export const variants: Variant[] = [
  {
    name: "BLUE EDITION",
    subtitle: "Blueberry",
    description: "A modern take on a classic soda with a perfect blend of sweet and tart, full of nostalgic blueberry flavor.",
    themeColor: "#0066FF",
    themeColorDark: "#3385FF",
    image: {
      baseUrl: "/frames/blue can",
      frameCount: 192,
    },
    ingredients: [{ name: "Blueberries" }, { name: "Natural Flavors" }, { name: "Caffeine" }, { name: "Taurine" }],
    nutrition: [
      { label: "Calories", value: "110", unit: "" },
      { label: "Total Fat", value: "0", unit: "g" },
      { label: "Sodium", value: "105", unit: "mg" },
      { label: "Total Carbs", value: "28", unit: "g" },
      { label: "Total Sugars", value: "27", unit: "g" },
      { label: "Protein", value: "0", unit: "g" },
    ],
  },
  {
    name: "YELLOW EDITION",
    subtitle: "Tropical",
    description: "A modern functional soda brand inspired by classic tropical flavors with exotic mango and pineapple notes.",
    themeColor: "#FFD700",
    themeColorDark: "#FFDE33",
    image: {
      baseUrl: "/frames/yellow can",
      frameCount: 192,
    },
    ingredients: [{ name: "Tropical Fruits" }, { name: "Natural Flavors" }, { name: "Caffeine" }, { name: "Taurine" }],
    nutrition: [
      { label: "Calories", value: "110", unit: "" },
      { label: "Total Fat", value: "0", unit: "g" },
      { label: "Sodium", value: "105", unit: "mg" },
      { label: "Total Carbs", value: "28", unit: "g" },
      { label: "Total Sugars", value: "27", unit: "g" },
      { label: "Protein", value: "0", unit: "g" },
    ],
  },
  {
    name: "RED EDITION",
    subtitle: "Watermelon",
    description: "Bright and refreshing watermelon soda with natural melon spark and crisp bubbles for ultimate refreshment.",
    themeColor: "#FF0000",
    themeColorDark: "#FF3333",
    image: {
      baseUrl: "/frames/red can",
      frameCount: 192,
    },
    ingredients: [{ name: "Watermelon" }, { name: "Natural Flavors" }, { name: "Caffeine" }, { name: "Taurine" }],
    nutrition: [
      { label: "Calories", value: "110", unit: "" },
      { label: "Total Fat", value: "0", unit: "g" },
      { label: "Sodium", value: "105", unit: "mg" },
      { label: "Total Carbs", value: "28", unit: "g" },
      { label: "Total Sugars", value: "27", unit: "g" },
      { label: "Protein", value: "0", unit: "g" },
    ],
  },
];

export const faqs: FaqItem[] = [
    {
      question: "What is Red Bull?",
      answer: "Red Bull is an energy drink sold by Red Bull GmbH, an Austrian company created in 1987. It is the best-selling energy drink in the world, with 11.5 billion cans sold in a year."
    },
    {
      question: "How much caffeine is in a can of Red Bull?",
      answer: "A single 8.4 fl oz can of Red Bull contains 80mg of caffeine, which is roughly the same amount as a cup of home-brewed coffee."
    },
    {
      question: "Is Red Bull suitable for vegetarians?",
      answer: "Yes, Red Bull Energy Drink is suitable for vegetarians. Red Bull Energy Drink is a functional beverage, it is not a thirst quencher."
    },
    {
      question: "Where are the ingredients sourced from?",
      answer: "The ingredients for Red Bull are sourced globally to ensure the highest quality. For example, the water is Alpine water sourced locally at our production sites in Austria and Switzerland."
    }
];

export const reviews: Review[] = [
    {
      name: "Alex S.",
      title: "The only thing that gets me through Mondays!",
      comment: "The Blueberry flavor is a game-changer. It's refreshing and gives me the boost I need without the jitters. A staple in my fridge.",
      rating: 5,
      avatarId: "review-avatar-1"
    },
    {
      name: "Maria P.",
      title: "Tastes like a vacation",
      comment: "I'm obsessed with the Tropical Yellow Edition. It's not too sweet and has the perfect exotic taste. It's my go-to for a midday pick-me-up.",
      rating: 5,
      avatarId: "review-avatar-2"
    },
    {
      name: "David L.",
      title: "Summer in a can",
      comment: "The Red Edition is my favorite. The watermelon flavor is so crisp and authentic. Perfect for a hot day or before a workout. Highly recommend!",
      rating: 5,
      avatarId: "review-avatar-3"
    }
];
