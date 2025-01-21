import { useEffect, useState } from "react";
import fetchNews from "../api/fetchNews";
import styles from "./NewsWidget.module.css";
import formatDateAndTime from "../utils/formatDateAndTime"

function NewsWidget() {
    const [news,setNews] = useState();

    useEffect(()=>{
        fetchNews().then((data)=>{
            if(data.status === "ok"){
                console.log(data.articles); 
                const randonIndex = Math.floor(Math.random() * data.articles.length);
                setNews(data.articles[randonIndex]);
                //math.random gives random values bw 0 and 1
                //len be l, L*[0,1] 
                // basically we are generating we are genration a number bw o and l-1;
         }
        });
    },[])

console.log(news);

const renderPublishedAt = (timestamp)=>{
    const {date,time} = formatDateAndTime(timestamp);
    return `${date} | ${time}`;
};

  return (
    <div className={styles.container}>
        <div className={styles.header}>
        <img src={news?.urlToImage}/>
           <div className={styles.heading}>
           <p>{news?.title}</p>
            <p>{renderPublishedAt(news?.publishedAt)}</p>
           </div>
        </div>
        <div className={styles.body} ></div> 
            <p>{news?.content}</p>
         </div>
  )
}

export default NewsWidget
