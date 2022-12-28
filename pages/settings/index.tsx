import React, { useRef, useState } from 'react';
import Header from '../../components/Header/Header';
import styles from './style.module.scss';
import Image from 'next/image';
import Avatar from '../../assets/img/avatar.jpeg';
import User from '../../assets/icons/user-3-line.svg';
import Bio from '../../assets/icons/bill-line.svg';
import ChangePasswordModal from '../../components/ChangePasswordModal';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, State } from '../../redux';
import { bindActionCreators } from 'redux';
import { useEffect } from 'react';
import { AppInterface } from '../_app';

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
    const handleOnSubmit = async () => {
        // const formData = new FormData();
        // if (inputRef.current.) {
        //     formData.append('file', inputRef.current.file[0]);
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
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                }}
            >
                <Header setIsShowLoginModal={() => {}}></Header>
            </div>
            <div className="wrapper">
                <div className="container">
                    <section className={styles[`settings`]}>
                        <div className="box">
                            <div className={styles[`settings__title`]}>Edit profile</div>
                            <div className={styles[`settings__avatar`]}>
                                <p>Your avatar</p>
                                <img src={imageSrc ?? currentUser.avatar} alt="" width={80} height={80}></img>
                                <label htmlFor="file">Change</label>
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
                                    <input defaultValue={'Tran Van Bao Thang'}></input>
                                </div>
                            </div>
                            <div className={styles[`settings__input`]}>
                                <span>Bio</span>
                                <div>
                                    <Image className="modal__close" src={Bio} alt=""></Image>
                                    <textarea
                                        rows={4}
                                        defaultValue="PlayDapp is a middleware blockchain solution providing companies with SDK's to
                                        integrate blockchain technology and easily turn their assets into NFT's.
                                        Companies with SDK's to"
                                    ></textarea>
                                </div>
                            </div>
                            <div className={styles[`settings__button`]}>
                                <button>Save</button>
                                <button onClick={() => setIsShowChangePasswordModal(true)}>Change password</button>
                            </div>
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
