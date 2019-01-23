import React from 'react'
import AudioLink from 'client/js/components/AudioLink'
import books from './bases.png'
import style from './style.module.css'

export default class Component extends React.Component {
    render() {
        return (
            <div>
                <div className={style.main}>
                    <div className={style.books}>
                        <img src={books} alt="books" />
                    </div>
                    <div className={style.registration}>
                        <h1>Слова</h1>
                        <h2>
                            из английских<br />учебников
                        </h2>
                        <button type="button" className="circular ui compact massive yellow button">
                            Регистрация
                        </button>
                    </div>
                </div>
                <div className={style.slogan}>
                    <div>
                        <div className={style.title}>Добавь</div>
                        <div className={style.desc}>
                            <div className={style.add} />
                            <div className={style.text}>
                                Добавь свои слова либо используй базы слов. Большинство баз основаны
                                на популярных учебниках.
                            </div>
                            <div className={style.button}>
                                <button
                                    type="button"
                                    className="circular ui compact big secondary button"
                                >
                                    Список баз
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={style.title}>Запомни</div>
                        <div className={style.desc}>
                            <div className={style.remember} />
                            <div className={style.text}>
                                Ипользуй словарные карточки для запоминания слов. Слова качественно
                                озвучены - транскрипция не нужна.
                            </div>
                            <div className={style.button}>
                                <button
                                    type="button"
                                    className="circular ui compact big secondary button"
                                >
                                    Демо
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={style.title}>Напиши</div>
                        <div className={style.desc}>
                            <div className={style.write} />
                            <div className={style.text}>
                                Напиши изученные слова. Вы научитесь не только писать без ошибок, но
                                и закрепите слова в памяти еще раз.
                            </div>
                            <div className={style.button}>
                                <button
                                    type="button"
                                    className="circular ui compact big secondary button"
                                >
                                    Демо
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.grid}>
                    <div className={style.left}>
                        <h2>Новости</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis
                            aspernatur veniam minima reiciendis odit quod sint maxime aut, optio
                            suscipit at distinctio ut inventore nam eveniet, neque quisquam? Sequi,
                            eius.
                        </p>
                    </div>
                    <div className={style.right}>
                        <h2>Цена</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
                            distinctio facilis sit, eos omnis, laboriosam quos repudiandae sint
                            voluptas! Nostrum provident fugiat sed assumenda quae quas incidunt id,
                            laboriosam facere, doloremque numquam aliquam maiores officiis
                            perferendis quos recusandae aliquid, cum, tempora dolores cumque! Facere
                            voluptas quas ad tempora inventore aliquam cupiditate pariatur! Tempora
                            consectetur, molestias commodi illu praesentium aut quia.
                        </p>
                        <AudioLink text="Sound example" audioUrl="samples/sample.mp3" />
                    </div>
                </div>
            </div>
        )
    }
}
