import React, { useRef, useState } from 'react';
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

interface FormElements extends HTMLCollection {
    name: string;
}

function index() {
    const currentUser: AppInterface['currentUser'] = useSelector((state: State) => state.currentUser);
    const dispath = useDispatch();
    const { setCurrentUser } = bindActionCreators(actionCreators, dispath);
    useEffect(() => {
        setCurrentUser(
            JSON.parse(`${window.localStorage.getItem('currentUser')}`) ?? {
                email: '',
                avatar: '',
                fullname: '',
            },
        );
    }, []);
    const [isShowChangePasswordModal, setIsShowChangePasswordModal] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState();
    const [uploadData, setUploadData] = useState();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        reader.onload = function (onLoadEvent: any) {
            setImageSrc(onLoadEvent.target.result);
            setUploadData(undefined);
        };
        e.target.files instanceof FileList && reader.readAsDataURL(e.target.files[0]);
    };
    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log('submit');
        console.log(imageSrc);

        const form = event.currentTarget;
        // const fileInput = Array.from(form.elements).find(({ type }) => type === 'file');
        // const formData = new FormData();
        // for (const file of fileInput.files) {
        //     formData.append('file', file);
        // }
        // formData.append('upload_preset', 'napacoin');
        // const data = await fetch('https://api.cloudinary.com/v1_1/de41uvd76/image/upload', {
        //     method: 'POST',
        //     body: formData,
        // }).then((r) => r.json());
        // console.log(data);
        // setImageSrc(data.url);
        // setUploadData(data);
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
                                        ></textarea>
                                    </div>
                                </div>
                                <div className={styles[`settings__input`]}>
                                    <span>Old password</span>
                                    <div>
                                        <Image className="modal__close" src={password} alt=""></Image>
                                        <input placeholder="******" type="password"></input>
                                    </div>
                                </div>
                                <div className={styles[`settings__input`]}>
                                    <span>New password</span>
                                    <div>
                                        <Image className="modal__close" src={password} alt=""></Image>
                                        <input placeholder="******" type="password"></input>
                                    </div>
                                </div>
                                <div className={styles[`settings__button`]}>
                                    <button>Save</button>
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
