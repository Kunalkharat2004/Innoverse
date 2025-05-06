import { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
	ThemeProvider as MuiThemeProvider,
	createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HomePage from "./pages/Home/HomePage.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import Auth from "./components/layouts/Auth.jsx";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";
import MainLayout from "./components/layouts/MainLayout.jsx";
import Info from "./pages/Info/InfoPage.jsx";
import About from "./pages/About/AboutPage.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import FeedBackPage from "./pages/Feedback/FeedBackPage.jsx";

// Import ThemeContext
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";
import IrrigationWaterReq from "./pages/IrrigationWaterReq/IrrigationWaterReq.jsx";
import OptimalCropSeason from "./pages/OptimalCropSeason/OptimalCropSeason.jsx";
import FertilizerRecommendation from "./pages/FertilizerRecommendation/FertilizerRecommendation.jsx";
import CropRecommendationPage from "./pages/CropRecommendation/CropRecommendationPage.jsx";
import CropYieldPredictor from "./pages/CropYieldPredictor/CropSwapping.jsx";
import GeoSpatialCropAnalysis from "./pages/GeoSpatialCropAnalysis/GeoSpatialCropAnalysis.jsx";
import PumpAndIrrigationStatus from "./pages/PumpAndIrrigationStatus/PumpAndIrrigationStatus.jsx";
import CropMarketTrendAnalyzerPage from "./pages/CropMarketTrendAnalyzer/CropMarketTrendAnalyzerPage.jsx";
import "./i18n"; 
import { CommonProvider } from "./context/common/commonContext.jsx";
import DiseasePage from "./pages/PlantDisease/DiseasePage.jsx";
import WeatherGeoFencing from "./pages/WeatherGeoFencing/WeatherGeoFencing.jsx";
import SoilAnalytic from "./pages/SoilAnalytic/SoilAnalytic.jsx";
import FertilizersPage from "./pages/Fertilizers/FertilizersPage.jsx";
import FarmerSupportServices from "./pages/FarmerSupportServices/FarmerSupportServices.jsx";
// import LanguageSwitcher from "./components/LanguageSwitcher.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ path: "home", element: <HomePage /> },
			{path:"/plant-disease-detector",element: <DiseasePage/>}, // done
			{path:"/weather-and-geofencing",element: <WeatherGeoFencing/>}, // done
			{path:"/soil-analytic",element: <SoilAnalytic/>}, // done
			{path:"/fertilizer-irrigation",element: <FertilizersPage/>}, // done
			{path:"waterNeedAnalysis/result",element: <IrrigationWaterReq/>}, // done
			{ path: "pumpAndIrrigationStatus", element: <PumpAndIrrigationStatus /> }, // done
			{ path: "info", element: <Info /> },
			{ path: "about", element: <About /> },
			{ path: "contact", element: <Contact /> },
			{ path: "users/:userId/feedback", element: <FeedBackPage /> },
			{ path: "/", element: <HomePage />, index: true },
			{path:"fertilizerRecommendation",element: <FertilizerRecommendation/>}, // done
			{path:"cropRecommendation",element: <CropRecommendationPage/>}, // done
			{path:"optimalCropSeason",element: <OptimalCropSeason/>}, // done
			{path:"cropYieldPredictor",element: <CropYieldPredictor/>}, // done
			{path:"geoSpatialCropAnalysis",element: <GeoSpatialCropAnalysis/>}, // done
			{ path: "cropMarketTrendAnalyzer", element: <CropMarketTrendAnalyzerPage /> }, // done
			{ path: "farmerSupportServices", element: <FarmerSupportServices /> }, // done

		],
	},
	{
		path: "/auth",
		element: <Auth />,
		children: [
			{ path: "login", element: <LoginPage /> },
			{ path: "register", element: <RegisterPage /> },
		],
	},
]);

// App component using ThemeContext and MuiThemeProvider
const AppContent = () => {
	const { theme } = useContext(ThemeContext);

	// Define MUI theme based on the context theme
	const muiTheme = createTheme({
		palette: {
			mode: theme === "light" ? "light" : "dark",
		},
	});

	return (
		<MuiThemeProvider theme={muiTheme}>
			<CssBaseline />
			<div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
				{/* Tailwind CSS and MUI components will share the theme */}
				<RouterProvider router={router} />
			</div>
		</MuiThemeProvider>
	);
};

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
			{/* <LanguageSwitcher /> */}
			<CommonProvider>
				<AppContent />
			</CommonProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
};

export default App;