import React, {useContext}from 'react';
import {AppContext} from "../context/AppContext";
import styles from "./ProfileWidget.module.css";
import pfp from "../assets/pfp.png";


function ProfileWidget() {

const {user,selectedGenres} = useContext(AppContext);


  return (
    <div className={styles.container}>
        <div className={styles.avatar}>
            <img src={pfp} alt="userAvatar" />
        </div>
        <div className={styles.details}>
            <p className={styles.name}>{user.name}</p>
            <p className={styles.email}>{user.email}</p>
            <p className={styles.username}>{user.username}</p>

            <div className={styles.genres}>
                {selectedGenres 
                .slice(0,4)
                .map((genre,index)=>(
                    <div key={index} className={styles.pill}>
                        {genre}
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ProfileWidget
