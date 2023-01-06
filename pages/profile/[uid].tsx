import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import { State } from '../../redux';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../redux';
import { bindActionCreators } from 'redux';
import { AppInterface } from '../_app';
import { useRouter } from 'next/router';
import { getInfo } from '../../apis/usersApis';
import FollowButton from '../../components/FollowButton';

interface IState {
    user: {
        fullname: string;
        email: string;
        bio: string;
        avatar: string;
        following: string[];
        follower: string[];
    };
}

function index() {
    const currentUser: AppInterface['currentUser'] = useSelector((state: State) => state.currentUser);
    const dispath = useDispatch();
    const { setCurrentUser } = bindActionCreators(actionCreators, dispath);
    const [user, setUser] = useState<IState['user']>({
        fullname: '',
        email: '',
        bio: '',
        avatar: '',
        follower: [],
        following: [],
    });
    const [followers, setFollowers] = useState<number>(0);
    const [token, setToken] = useState<string>('');
    const router = useRouter();
    const { uid } = router.query;
    useEffect(() => {
        if (uid === currentUser._id) {
            router.push('/profile');
        }
        if (uid) {
            getInfo(uid, window.localStorage.getItem('token') ?? '')
                .then((res) => {
                    setUser(res.results);
                    setFollowers(res.results.follower.length);
                })
                .catch((err) => {
                    router.push('/home');
                });
        }
    }, [uid]);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        const current = JSON.parse(`${window.localStorage.getItem('currentUser')}`) ?? {
            email: '',
            avatar: '',
            fullname: '',
            bio: '',
        };
        setCurrentUser(current);
        setToken(window.localStorage.getItem('token') ?? '');
        if (typeof uid === 'string') {
            setIsFollowing(current.following?.includes(uid));
        }
    }, [router.isReady, router.query.uid]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    return (
        <>
            <Header setIsShowLoginModal={() => {}}></Header>
            <div className="wrapper">
                <div className="container">
                    <section className={styles[`profile`]}>
                        <img src={user.avatar} alt="" className={styles[`profile__image`]}></img>
                        <div className="box">
                            <p className={styles[`profile__name`]}>{user.fullname}</p>
                            <p className={styles[`profile__email`]}>{user.email}</p>
                            <div className={styles[`profile__follow`]}>
                                <p>
                                    <span>{user?.following?.length}</span>
                                    &nbsp;following
                                </p>
                                <p>
                                    <span>{followers}</span>
                                    &nbsp;followers
                                </p>
                            </div>
                            <p className={styles[`profile__bio`]}>{user.bio}</p>
                            <FollowButton
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                                isFollowing={isFollowing}
                                setIsFollowing={setIsFollowing}
                                setFollowers={setFollowers}
                                followedId={uid}
                            ></FollowButton>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default index;