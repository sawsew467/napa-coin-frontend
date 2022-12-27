import React from 'react';
import close from '../../assets/icons/CloseOutlined.svg';
import Image from 'next/image';
import styles from './style.module.scss';

interface IProps {
    setIsShowChangePasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function index({ setIsShowChangePasswordModal }: IProps) {
    return (
        <div className="overlay">
            <div className="modal box">
                <Image
                    className="modal__close"
                    src={close}
                    alt=""
                    onClick={() => setIsShowChangePasswordModal(false)}
                ></Image>

                <div className="modal__title">Change password</div>
                <div className={styles['modal__input']}>
                    <label>New password</label>
                    <input placeholder="Enter your new password"></input>
                </div>
                <div className={styles['modal__input']}>
                    <label>Confirm new password</label>
                    <input placeholder="Repeat your new password"></input>
                </div>
                <button className="modal__button--primary">Change password</button>
            </div>
        </div>
    );
}

export default index;
