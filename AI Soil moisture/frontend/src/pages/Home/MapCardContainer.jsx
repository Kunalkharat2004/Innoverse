import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import img from "../../assets/image/Header.gif";
import { FaRegChartBar, FaMapMarkerAlt, FaWater } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function MapCardContainer() {
	const { t } = useTranslation();
	useEffect(() => {
		AOS.init({
			duration: 1000,
		});
	}, []);

	return (
		<div className="py-20">
		<div className="w-full flex flex-wrap mx-auto justify-center items-center bg-opacity-50 max-w-[1450px] rounded-3xl md:py-10">
			<div className="w-full md:flex-[0_0_40%] md:w-auto p-4 text-center mb-8 md:mb-0">
				<img
					src={img}
					alt="Irrigation System Graphic"
					className="w-[90%] max-w-[200px] md:max-w-[350px] mx-auto md:w-[min(90%,_400px)] rounded-3xl"
					data-aos="fade-up"
				/>
			</div>
			<div className="w-full md:flex-[0_0_55%] md:w-auto p-4 md:p-8">
				<h1 className="text-3xl mb-8" data-aos={"fade-up"}>
					{t("mapCardheading")}{" "}
					<FaWater className="inline-block ml-2 text-emerald-600" />
				</h1>
				<ul>
					<li className="my-4 text-[20px]" data-aos={"fade-up"}>
						<FaRegChartBar className="inline-block mr-2 text-emerald-600" />
						{t("mapCarddescription1")}
					</li>
					<li className="my-4 text-[20px]" data-aos={"fade-up"}>
						<FaMapMarkerAlt className="inline-block mr-2 text-emerald-600" />
						{t("mapCarddescription2")}
					</li>
					<li className="my-4 text-[20px]" data-aos={"fade-up"}>
						<FaWater className="inline-block mr-2 text-emerald-600" />
						{t("mapCarddescription3")}
					</li>
				</ul>
			</div>
		</div>
	</div>
	
	);
}

export default MapCardContainer;
