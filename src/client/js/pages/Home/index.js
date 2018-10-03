import React from 'react'
import style from './style.module.css'

export default class Component extends React.Component {
    render() {
        return (
            <div style={{ paddingTop: '16em' }}>
                <div className={style.slogan}>
                    <div>Добавь</div>
                    <div>Запомни</div>
                    <div>Напиши</div>
                </div>
                <div className={style.sloganDesc}>
                    <div>
                        <div className={style.picture} />
                        <div className={style.text}>
                            Добавь свои слова либо используй базы слов. Большинство баз основаны на
                            популярных учебниках.
                        </div>
                        <div className={style.button}>
                            <button className="circular ui compact big secondary button">
                                Список баз
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className={style.picture} />
                        <div className={style.text}>
                            Ипользуй словарные карточки для запоминания слов. Слова качественно
                            озвучены - транскрипция не нужна.
                        </div>
                        <div className={style.button}>
                            <button className="circular ui compact big secondary button">
                                Демо
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className={style.picture} />
                        <div className={style.text}>
                            Напиши изученные слова. Вы научитесь не только писать без ошибок, но и
                            закрепите слова в памяти еще раз.
                        </div>
                        <div className={style.button}>
                            <button className="circular ui compact big secondary button">
                                Демо
                            </button>
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
                            consectetur, molestias commodi illum praesentium aut quia.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
