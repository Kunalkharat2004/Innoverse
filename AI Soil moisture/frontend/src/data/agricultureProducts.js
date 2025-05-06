const agricultureProducts = [
  {
    id: 1,
    name: "High-Yield Hybrid Rice Seeds",
    category: "seeds",
    price: 1250,
    unit: "per 5kg bag",
    inStock: true,
    rating: 4.7,
    image: "https://panseeds.in/wp-content/uploads/2023/02/Pan_2423.png",
    description:
      "Premium quality rice seeds with high germination rate and yield potential",
    features: [
      "130-day maturity",
      "Disease resistant",
      "High yield potential (65-75 quintals/hectare)",
    ],
  },
  {
    id: 2,
    name: "Organic Tomato Seeds (GS-12)",
    category: "seeds",
    price: 350,
    unit: "per 100g pack",
    inStock: true,
    rating: 4.5,
    image:
      "https://5.imimg.com/data5/WS/XT/QD/SELLER-40998616/tomato-seeds-500x500.jpg",
    description:
      "Certified organic tomato seeds ideal for commercial cultivation",
    features: [
      "High disease resistance",
      "Heavy fruiting",
      "85-90 days to maturity",
    ],
  },
  {
    id: 3,
    name: "Premium NPK Complex Fertilizer (19-19-19)",
    category: "fertilizers",
    price: 1150,
    unit: "per 50kg bag",
    inStock: true,
    rating: 4.8,
    image: "https://m.media-amazon.com/images/I/612LJ7lHWTS._SL1181_.jpg",
    description:
      "Balanced NPK fertilizer for all-round crop development and higher yields",
    features: [
      "Water soluble",
      "Suitable for all crops",
      "Balanced nutrient ratio",
    ],
  },
  {
    id: 4,
    name: "Organic Vermicompost",
    category: "fertilizers",
    price: 899,
    unit: "per 50kg bag",
    inStock: true,
    rating: 4.6,
    image:
      "https://5.imimg.com/data5/ES/XM/KJ/SELLER-42795699/1kg-organic-vermicompost-500x500.jpg",
    description:
      "100% organic soil amendment produced by earthworms to improve soil fertility",
    features: [
      "Improves soil structure",
      "Contains beneficial microorganisms",
      "Enhances water retention",
    ],
  },
  {
    id: 5,
    name: "Professional Battery Pruning Shears",
    category: "tools",
    price: 4500,
    unit: "per piece",
    inStock: true,
    rating: 4.7,
    image: "https://m.media-amazon.com/images/I/61p2go7wQYL.jpg",
    description:
      "Rechargeable battery-powered pruning shears for effortless cutting",
    features: [
      "Lithium-ion battery",
      "Up to 6 hours runtime",
      "25mm cutting capacity",
    ],
  },
  {
    id: 6,
    name: "Neem-Based Natural Pest Control",
    category: "pesticides",
    price: 599,
    unit: "per 5L container",
    inStock: true,
    rating: 4.4,
    image: "https://m.media-amazon.com/images/I/71CMEY9x-FL._SL1500_.jpg",
    description:
      "Organic neem oil formulation for controlling a wide range of pests",
    features: [
      "Organic certified",
      "Safe for beneficial insects",
      "Broad-spectrum protection",
    ],
  },
  {
    id: 7,
    name: "Smart Soil Moisture Sensor Kit",
    category: "tools",
    price: 2499,
    unit: "per kit",
    inStock: true,
    rating: 4.6,
    image:
      "https://image.made-in-china.com/2f0j00nSqbuYRFwNkm/Tuya-Smart-Soil-NPK-Sensor-Wireless-WiFi-Zigbee-Temperature-Humidity-Sensors-Soil-Hygrometer-Moisture-Sensor-Detector-Tester.webp",
    description:
      "IoT-enabled soil moisture monitoring system for precision irrigation",
    features: [
      "Battery-powered",
      "Mobile app connectivity",
      "Real-time alerts",
      "Water-saving technology",
    ],
  },
  {
    id: 8,
    name: "Solar-Powered Mini Water Pump",
    category: "tools",
    price: 3999,
    unit: "per unit",
    inStock: true,
    rating: 4.5,
    image:
      "https://tse3.mm.bing.net/th?id=OIP.Kge-NNY01ginGwAM86RP6AHaGW&pid=Api&P=0&h=180",
    description:
      "Eco-friendly solar-powered water pump for small-scale irrigation",
    features: [
      "No electricity needed",
      "5-year warranty",
      "Portable design",
      "Adjustable flow rate",
    ],
  },
  {
    id: 9,
    name: "Micronutrient Fertilizer Mix",
    category: "fertilizers",
    price: 780,
    unit: "per 10kg bag",
    inStock: true,
    rating: 4.3,
    image:
      "https://5.imimg.com/data5/SELLER/Default/2022/9/VE/NY/PE/25464873/mix-micronutrient-liquid-1000x1000.jpg",
    description:
      "Specialized micronutrient blend to correct deficiencies and boost crop health",
    features: [
      "Chelated formulation",
      "Easy to apply",
      "Contains Zn, Fe, Mn, Cu, B",
    ],
  },
  {
    id: 10,
    name: "Drip Irrigation Starter Kit",
    category: "tools",
    price: 1999,
    unit: "per kit",
    inStock: true,
    rating: 4.8,
    image:
      "https://tse4.mm.bing.net/th?id=OIP.uNbuV9ZYuqjzR8HmkYCwOQHaHa&pid=Api&P=0&h=180",
    description:
      "Complete drip irrigation system for efficient water usage in small farms",
    features: [
      "Water-efficient",
      "Easy installation",
      "Covers 1/4 acre",
      "Includes all connectors",
    ],
  },
  {
    id: 11,
    name: "Systemic Fungicide (Propiconazole 25% EC)",
    category: "pesticides",
    price: 899,
    unit: "per 1L bottle",
    inStock: true,
    rating: 4.2,
    image:
      "https://5.imimg.com/data5/SELLER/Default/2022/2/ZJ/GM/JF/21021813/propiconazole-25-ec-systemic-fungicide-1000x1000.jpg",
    description:
      "Effective systemic fungicide for controlling a wide range of fungal diseases",
    features: [
      "Systemic action",
      "Preventive & curative",
      "Low application rate",
    ],
  },
  {
    id: 12,
    name: "Weather-Resistant Crop Cover Sheets",
    category: "tools",
    price: 1299,
    unit: "per 10m×10m",
    inStock: true,
    rating: 4.4,
    image:
      "https://tse3.mm.bing.net/th?id=OIP.tQzr5uSiseHkZu4Xs0kMTQHaF2&pid=Api&P=0&h=180",
    description:
      "Protective covers to shield crops from extreme weather conditions",
    features: ["UV-resistant", "Frost protection", "Reusable for 3-5 seasons"],
  },
];

export default agricultureProducts;
