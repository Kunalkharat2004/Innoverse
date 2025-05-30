import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import CardData from "../../data/featuresCardData";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Features = () => {

  const {t} = useTranslation();

  const handleCardClick = (index)=>{
    console.log(`Clicked ${index}`);
    
  }

  const navigate = useNavigate();
  return (
    <>
      <section className="services-section py-8 md:py-12 md:mt-12">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-extrabold dark:text-white">{t("featureCardheading")}</h2>
          <p className="mt-4 text-lg leading-6 dark:text-gray-300">
            {t("featureCarddescription")}
          </p>
          <div className="text-left flex flex-wrap md:justify-between justify-center space-x-4">
            {CardData.map((data, index) => (
              <Card key={index} className="mt-6 w-64 flex flex-col bg-white rounded-lg dark:bg-gray-800 hover:shadow-2xl
              hover:cursor-pointer
              hover:scale-105
              transition-all
              duration-300 
              ease-in-out
              "
              onClick={()=> navigate(data.path)}>
                <CardHeader color="blue-gray" className="relative h-56 order-first pt-4">
                  <img
                    src={data.image}
                    alt={data.title}
                    className="object-contain w-full h-full"
                  />  
                  
                </CardHeader>
                <CardBody className="flex-grow">
                  <Typography variant="h5" color="blue-gray" className="mb-2 dark:text-white">
                    {t(data.title)}
                  </Typography>
                  <Typography className="dark:text-gray-300">
                    {t(data.description)}
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <Link to={data.path}>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800">Click Here</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Features;
