import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

import Account from './Account';
import style from './top-account.module.scss';

const TopAccount = () => {
    return (
        <div className={style.account__container}>
            <div className={style.account__title}>
                <h2>
                    {' '}
                    <FontAwesomeIcon className={style.star} icon={faStar} /> Top Community Accounts
                </h2>
                <div className={style.account__flex}>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={96}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        centeredSlides={true}
                        modules={[Autoplay, Pagination]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <Account></Account>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Account></Account>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Account></Account>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Account></Account>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Account></Account>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default TopAccount;
