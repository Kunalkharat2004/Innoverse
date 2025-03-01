import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useEffect, useRef } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { testimonials } from "../../data/testimonials";
import { useTranslation } from "react-i18next";

export default function Testimonial() {
    const { t } = useTranslation();
    const swiperRef = useRef(null);

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto text-center">
                <h2 className="text-5xl font-bold mb-4" data-aos="fade-up">
                    {t("testimonialsheading")}
                </h2>
                <p className="mb-10" data-aos="fade-up">
                    {t("testimonialsdescription")}
                </p>
                <div
                    className="border-b-4 border-indigo-500 w-20 mx-auto mb-12"
                    data-aos="fade-up"
                ></div>

                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    slidesPerView={1}
                    spaceBetween={30}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    pagination={{ clickable: true }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper"
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index} className="text-center">
                            <div
                                className="p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                                onMouseEnter={() => swiperRef.current?.autoplay.stop()}
                                onMouseLeave={() => swiperRef.current?.autoplay.start()}
                                data-aos="fade-up"
                            >
                                <div className="flex items-center justify-center mb-4">
                                    <img
                                        src={testimonial.image}
                                        alt={t(`testimonials.${index}.name`)}
                                        className="w-16 h-16 object-cover rounded-full border-4 border-indigo-500"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold uppercase mb-2">
                                    {t(`testimonials.${index}.name`)}
                                </h3>
                                <p className="text-sm text-indigo-400 mb-4">
                                    {t(`testimonials.${index}.role`)}
                                </p>
                                <p className="italic">"{t(`testimonials.${index}.message`)}"</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}