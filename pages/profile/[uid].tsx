import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header/Header';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import { State } from '../../redux';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../redux';
import { bindActionCreators } from 'redux';
import { AppInterface, socket } from '../_app';
import { useRouter } from 'next/router';
import { getInfo } from '../../apis/usersApis';
import FollowButton from '../../components/FollowButton';
import { DataType } from '../../components/TableToken/TableToken';
import { getTokenLastest } from '../../apis/tokenApis';

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
    const router = useRouter();
    const dispatch = useDispatch();
    const { uid } = router.query;

    const currentUser: AppInterface['currentUser'] = useSelector((state: State) => state.currentUser);
    const darkMode: AppInterface['darkmode'] = useSelector((state: State) => state.darkmode);
    const search: AppInterface['darkmode'] = useSelector((state: State) => state.search);
    const { setSearch } = bindActionCreators(actionCreators, dispatch);
    const dispath = useDispatch();
    const { setCurrentUser } = bindActionCreators(actionCreators, dispath);
    const [searchResult, setSearchResult] = useState<DataType[]>([]);
    const [isSearchResult, setIsSearchResult] = useState<boolean>(false);
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
    const [results, setResult] = useState<DataType[]>([]);

    // socket.on('follow', (socket: any) => {
    //     if (uid) {
    //         getInfo(uid, window.localStorage.getItem('token') ?? '')
    //             .then((res) => {
    //                 setUser(res.results);
    //                 setFollowers(res.results.follower.length);
    //                 const current = JSON.parse(`${window.localStorage.getItem('currentUser')}`) ?? {
    //                     email: '',
    //                     avatar: '',
    //                     fullname: '',
    //                     bio: '',
    //                 };
    //                 setIsFollowing(current.following?.includes(uid));
    //             })
    //             .catch((err) => {
    //                 router.push('/home');
    //             });
    //     }
    // });

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
    const timingTimeoutRef = useRef<any>(null);

    useEffect(() => {
        const listData = async () => {
            const res = await getTokenLastest();
            setResult(res.data.data);
            setIsLoading(false);
        };

        listData();
    }, []);

    const handleSearchDebound = (e: { target: { value: any } }) => {
        const value = e.target.value;
        setSearch(value);

        if (timingTimeoutRef.current) {
            clearTimeout(timingTimeoutRef.current);
        }

        timingTimeoutRef.current = setTimeout(() => {
            const filterResult = results?.filter((token) => {
                return (
                    token?.name?.toLowerCase()?.includes(value.toLowerCase()) ||
                    token?.symbol?.toLowerCase()?.includes(value.toLowerCase())
                );
            });
            setSearchResult(filterResult);
            setIsSearchResult(true);
        }, 500);
    };
    return (
        <>
            <div className={darkMode}>
                <Header
                    searchResult={searchResult}
                    isSearchResult={isSearchResult}
                    handleSearchDebound={handleSearchDebound}
                ></Header>
                <div className="wrapper page-wrapper">
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
            </div>
        </>
    );
}

export default index;
