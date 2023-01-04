import React, { useId, useRef, useState } from 'react';
import Header from '../../components/Header/Header';
import styles from './style.module.scss';
import Image from 'next/image';
import Avatar from '../../assets/img/avatar.jpeg';
import camera from '../../assets/img/camera.svg';
import password from '../../assets/icons/door-lock-line.svg';
import User from '../../assets/icons/user-3-line.svg';
import Bio from '../../assets/icons/bill-line.svg';
import ChangePasswordModal from '../../components/ChangePasswordModal';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, State } from '../../redux';
import { bindActionCreators } from 'redux';
import { useEffect } from 'react';
import { AppInterface } from '../_app';
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import { changePassword, editProfile } from '../../apis/usersApis';

interface IState {
    userInput: {
        email: string;
        avatar: string;
        fullname: string;
        bio: string;
        oldPassword: string;
        newPassword: string;
    };
}

function index() {
    const currentUser: AppInterface['currentUser'] = useSelector((state: State) => state.currentUser);
    const [userInput, setUserInput] = useState<IState['userInput']>({
        email: '',
        avatar: '',
        fullname: '',
        bio: '',
        oldPassword: '',
        newPassword: '',
    });
    const [token, setToken] = useState<string>('');
    const dispath = useDispatch();
    const { setCurrentUser } = bindActionCreators(actionCreators, dispath);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const current: AppInterface['currentUser'] = JSON.parse(`${window.localStorage.getItem('currentUser')}`) ?? {
            email: '',
            avatar: '',
            fullname: '',
            bio: '',
        };
        setCurrentUser(current);
        setUserInput({
            ...current,
            oldPassword: '',
            newPassword: '',
        });
        setToken(window.localStorage.getItem('token') ?? '');
        if (!JSON.parse(`${window.localStorage.getItem('currentUser')}`)) {
            router.push('/home');
        }
    }, []);
    const [isShowChangePasswordModal, setIsShowChangePasswordModal] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState();
    const [uploadData, setUploadData] = useState();
    const inputRef = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        reader.onload = function (onLoadEvent: any) {
            setImageSrc(onLoadEvent.target.result);
            setUploadData(undefined);
        };
        e.target.files instanceof FileList && reader.readAsDataURL(e.target.files[0]);
    };
    const uploadCloudinary = async (event: React.FormEvent<HTMLFormElement>) => {
        if (inputRef.current?.files) {
            const form = event.currentTarget;
            const formData = new FormData();
            formData.append('file', inputRef.current?.files[0]);
            formData.append('upload_preset', 'napacoin');
            const data = await fetch('https://api.cloudinary.com/v1_1/de41uvd76/image/upload', {
                method: 'POST',
                body: formData,
            }).then((r) => r.json());
            setUploadData(data);
            return data.url;
        }
    };
    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const imageUrl = await uploadCloudinary(event);
        if (userInput.oldPassword || userInput.newPassword) {
            const response = await changePassword(currentUser._id, token, userInput.oldPassword, userInput.newPassword);

            switch (response.data.status) {
                case 'success':
                    router.reload();
                    break;
                case 'error':
                    // console.log(response.data.message);
                    setErrorMessage(response.data.message);
                    break;
            }
        } else {
            setErrorMessage('');
        }
        if (userInput.fullname !== currentUser.fullname || userInput.bio !== currentUser.bio || imageUrl) {
            const data = {
                avatar: imageUrl,
                fullname: userInput.fullname,
                bio: userInput.bio,
            };
            const response = await editProfile(currentUser._id, token, data);
            setCurrentUser({
                ...currentUser,
                fullname: response.fullname,
                avatar: response.avatar,
                bio: response.bio,
            });
            window.localStorage.setItem(
                'currentUser',
                JSON.stringify({
                    ...currentUser,
                    fullname: response.fullname,
                    avatar: response.avatar,
                    bio: response.bio,
                }),
            );
            // setErrorMessage('');
            console.log('reload');

            Router.reload();
        } else {
            // setErrorMessage('');
        }
        setIsLoading(false);
    };

    return (
        <>
            <Header setIsShowLoginModal={() => {}}></Header>
            <div className="wrapper">
                <div className="container">
                    <section className={styles[`settings`]}>
                        <div className="box">
                            <form method="post" onSubmit={(e) => handleOnSubmit(e)}>
                                <div className={styles[`settings__title`]}>Edit profile</div>
                                <div className={styles[`settings__avatar`]}>
                                    <p>Your avatar</p>
                                    <div>
                                        <img src={imageSrc ?? currentUser.avatar} alt="" width={80} height={80}></img>

                                        <label htmlFor="file">
                                            <Image src={camera} alt=""></Image>
                                        </label>
                                    </div>

                                    <input
                                        className={styles[`settings__file`]}
                                        type="file"
                                        id="file"
                                        ref={inputRef}
                                        onChange={(e) => handleOnChange(e)}
                                    ></input>
                                </div>
                                <div className={styles[`settings__input`]}>
                                    <span>Full name</span>
                                    <div>
                                        <Image className="modal__close" src={User} alt=""></Image>
                                        <input
                                            placeholder="Enter your name"
                                            defaultValue={currentUser.fullname}
                                            value={userInput.fullname}
                                            onChange={(e) => setUserInput({ ...userInput, fullname: e.target.value })}
                                        ></input>
                                    </div>
                                </div>
                                <div className={styles[`settings__input`]}>
                                    <span>Bio</span>
                                    <div>
                                        <Image className="modal__close" src={Bio} alt=""></Image>
                                        <textarea
                                            placeholder="Your bio is empty"
                                            rows={4}
                                            defaultValue={currentUser.bio}
                                            // value={userInput.bio}
                                            onChange={(e) => setUserInput({ ...userInput, bio: e.target.value })}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className={styles[`settings__input`]}>
                                    <span>Old password</span>
                                    <div>
                                        <Image className="modal__close" src={password} alt=""></Image>
                                        <input
                                            placeholder="******"
                                            type="password"
                                            value={userInput.oldPassword}
                                            onChange={(e) =>
                                                setUserInput({ ...userInput, oldPassword: e.target.value })
                                            }
                                            name="password"
                                            autoComplete="on"
                                        ></input>
                                    </div>
                                </div>
                                <div className={styles[`settings__input`]}>
                                    <span>New password</span>
                                    <div>
                                        <Image className="modal__close" src={password} alt=""></Image>
                                        <input
                                            placeholder="******"
                                            type="password"
                                            value={userInput.newPassword}
                                            onChange={(e) =>
                                                setUserInput({ ...userInput, newPassword: e.target.value })
                                            }
                                            name="password"
                                            autoComplete="on"
                                        ></input>
                                    </div>
                                </div>
                                {errorMessage ? (
                                    <p className={styles[`settings__error`]}>{errorMessage}</p>
                                ) : (
                                    <p className={styles[`settings__error`]}>&nbsp;</p>
                                )}
                                <div className={styles[`settings__button`]}>
                                    {isLoading ? <button>Loading...</button> : <button>Save</button>}
                                    {/* <button>Save</button> */}
                                    {/* <button onClick={() => setIsShowChangePasswordModal(true)}>Change password</button> */}
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
            {isShowChangePasswordModal && (
                <ChangePasswordModal setIsShowChangePasswordModal={setIsShowChangePasswordModal}></ChangePasswordModal>
            )}
        </>
    );
}

export default index;
