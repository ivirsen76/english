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
                            <button className="ui secondary button">Список баз</button>
                        </div>
                    </div>
                    <div>
                        <div className={style.picture} />
                        <div className={style.text}>
                            Ипользуй словарные карточки для запоминания слов. Слова качественно
                            озвучены - транскрипция не нужна.
                        </div>
                        <div className={style.button}>
                            <button className="ui secondary button">Демо</button>
                        </div>
                    </div>
                    <div>
                        <div className={style.picture} />
                        <div className={style.text}>
                            Напиши изученные слова. Вы научитесь не только писать без ошибок, но и
                            закрепите слова в памяти еще раз.
                        </div>
                        <div className={style.button}>
                            <button className="ui secondary button">Демо</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
