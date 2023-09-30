'use client';
import Image from 'next/image';
import Slider from 'react-slick';

import BannerOne from '@/assets/bannerone.jpg';
import BannerTwo from '@/assets/bannertwo.jpg';
import BannerThree from '@/assets/bannerthree.jpg';
import { PiCaretLeftLight, PiCaretRightLight } from 'react-icons/pi';
import BannerText from './BannerText';

type ArrowProps = {
    onClick?: () => void;
};

const Banner = () => {
    const NextArrow = (props: ArrowProps) => {
        const { onClick } = props;

        return (
            <div
                onClick={onClick}
                className="p-3 bg-slate-100 hover:text-orange-600 hover:bg-white cursor-pointer duration-200 rounded-full text-2xl flex items-center justify-center z-20 absolute left-2 top-1/2"
            >
                <PiCaretLeftLight />
            </div>
        );
    };

    const PrevArrow = (props: ArrowProps) => {
        const { onClick } = props;

        return (
            <div
                className="p-3 bg-slate-100 hover:text-orange-600 hover:bg-white cursor-pointer duration-200 rounded-full text-2xl flex items-center justify-center z-20 absolute right-2 top-1/2"
                onClick={onClick}
            >
                <PiCaretRightLight />
            </div>
        );
    };

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className="relative">
            <Slider {...settings}>
                <div className="w-full h-full relative">
                    <Image
                        src={BannerOne}
                        alt="Banner One"
                        className="w-full h-full relative"
                    />
                    <BannerText title="Outerwear Picks" />
                </div>
                <div className="w-full h-full relative">
                    <Image
                        src={BannerTwo}
                        alt="Banner Two"
                        className="w-full h-full relative"
                    />
                    <BannerText title="Seasonal Offers" />
                </div>
                <div className="w-full h-full relative">
                    <Image
                        src={BannerThree}
                        alt="Banner Three"
                        className="w-full h-full relative"
                    />
                    <BannerText title="Best for Men" />
                </div>
            </Slider>
        </div>
    );
};

export default Banner;
