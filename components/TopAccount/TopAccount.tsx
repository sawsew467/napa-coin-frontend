import React, { useEffect, useState } from 'react';
import style from './top-account.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { AppInterface, socket } from '../../pages/_app';
import Account from './Account';
import { getAllUsers } from '../../apis/usersApis';
import { useSelector } from 'react-redux';
import { State } from '../../redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import clsx from 'clsx';

export interface IState {
    user: {
        _id: string;
        fullname: string;
        email: string;
        avatar: string;
        follower: string[];
        following: string[];
    };
    userList: IState['user'][];
}

const settings = {
    dots: true,
    infinite: true,
    // autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplaySpeed: 4000,
    cssEase: 'linear',
};

const TopAccount = () => {
    const currentUser: AppInterface['currentUser'] = useSelector((state: State) => state.currentUser);
    const [userList, setUserList] = useState<IState['userList']>([]);
    socket.on('followed', (socket: any) => {
        console.log('socket', socket);
        getAllUsers()
            .then((res) => {
                setUserList(res.data.users);
            })
            .catch((err) => {
                console.log(err);
            });
    });
    useEffect(() => {
        getAllUsers()
            .then((res) => {
                setUserList(res.data.users);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    // console.log(userList);

    return (
        <div className={clsx(style.account__container, 'box')}>
            <div className={style.account__title}>
                <h2>
                    {' '}
                    <FontAwesomeIcon className={style.star} icon={faStar} /> Top Community Accounts
                </h2>
                <Slider {...settings}>
                    {userList
                        .filter((user) => user._id !== currentUser._id)
                        .map((user) => {
                            const isFollowing = user.follower.includes(currentUser._id);
                            // console.log('!!!', user.email, isFollowing);

                            return (
                                <div key={user._id}>
                                    <Account user={user} following={isFollowing}></Account>
                                </div>
                            );
                        })}
                </Slider>
                {/* <div className={style.account__flex}>
                    {/* <Swiper
                        slidesPerView={3}
                        spaceBetween={0}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Autoplay, Pagination]}
                        className="mySwiper"
                    >
                        {userList
                            .filter((user) => user._id !== currentUser._id)
                            .map((user) => (
                                <SwiperSlide key={user._id}>
                                    <Account user={user}></Account>
                                </SwiperSlide>
                            ))}
                    </Swiper> */}
                {/* </div> */}
            </div>
        </div>
    );
};

export default TopAccount;
