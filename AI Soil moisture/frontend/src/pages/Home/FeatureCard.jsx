import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
	FaChartLine,
	FaRobot,
	FaHeartbeat,
	FaRegLightbulb,
	FaWater,
	FaCloudSun,
} from "react-icons/fa";
import { MdComputer, MdSensors } from "react-icons/md";

// import { BsGraphUp } from "react-icons/bs";
// import { GiWaterDrop, GiGeothermal } from "react-icons/gi";
// import { FaRegChartBar } from "react-icons/fa";

const features = [
	{
	  icon: <MdSensors className="text-emerald-600" />,
	  title: "feature1title",
	  description:
		"feature1description",
	},
	{
	  icon: <FaRobot className="text-emerald-600" />,
	  title: "feature2title",
	  description:
		"feature2description",
	},
	{
	  icon: <FaWater className="text-emerald-600" />,
	  title: "feature3title",
	  description:
		"feature3description",
	},
	{
	  icon: <FaCloudSun className="text-emerald-600" />,
	  title: "feature4title",
	  description:
		"feature4description",
	},
  ];
  

  const FeatureCard = () => {
	const {t} = useTranslation();
	useEffect(() => {
	  Aos.init({
		duration: 1000,
	  });
	}, []);
  
	return (
	  <section className="services-section py-8 md:py-12 md:mt-12">
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		  <h2 className="text-3xl font-extrabold">{t("featureheading")}</h2>
		  <p className="mt-4 text-lg leading-6">
			{t("featuredescription")}
		  </p>
  
		  <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
			{features.map((feature, index) => (
			  <div
				key={index}
				data-aos="fade-up"
				className="service-item p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
			  >
				<div className="icon-container mb-4 flex justify-center items-center">
				  <div className="icon text-indigo-600 text-4xl sm:text-5xl lg:text-6xl">
					{feature.icon}
				  </div>
				</div>
				<h3 className="text-xl font-semibold">{t(feature.title)}</h3>
				<p className="mt-2">{t(feature.description)}</p>
			  </div>
			))}
		  </div>
		</div>
	  </section>
	);
  };
  
  export default FeatureCard;
  