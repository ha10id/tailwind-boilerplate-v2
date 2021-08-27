import React from "react";
import { Loading } from '../components/Loading';
import { Panel } from '../components/Panel';
import { Social } from '../components/Social';

export const Home = () => {
    const socialButtonEvent = (type) => {
        console.log(type);
    }
    return (
        <div className="page">
            <h1 className="page-header">Главная</h1>
            <div className="grid grid-cols-2 gap-4">
                <Panel title="Группа кнопок">
                    <div className='button-group'>
                        <button className="button-default">Click Me</button>
                        <button className="button-primary">Click Me</button>
                        <button className="button-danger">Click Me</button>
                        <button className="button-success">Click Me</button>
                    </div>
                </Panel>
                <Panel title="Социальные сети (компонент Social)">
                    <Social action={socialButtonEvent}/>
                </Panel>
                <Panel title="Элементы ввода">
                    <div className="mt-3">
                        <label htmlFor="email_address">Адрес электронной
                            почты</label>
                        <input type='text'/>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="category">Категория</label>
                        <select
                            name="category"
                            id="category">
                            <option>Категория 1</option>
                            <option>Категория 2</option>
                            <option>Категория 3</option>
                            <option>Категория 4</option>
                            <option>Категория 5</option>
                            <option>Категория 6</option>
                            ))}
                        </select>

                    </div>
                    <div className="mt-3">
                        <label>Описание объекта</label>
                        <textarea placeholder="Введите описание объекта"/>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="checkbox">
                            <input type="checkbox"
                                   name="checkbox"
                                   id="checkbox"
                            />
                            <span className="ml-2">элемент</span>
                        </label>
                    </div>
                    <div className="mt-3 flex flex-row flex-wrap">
                        <input type="radio" id="contactChoice1"
                               name="contact" value="email"/>
                        <label className="ml-2 mr-4" htmlFor="contactChoice1">Почта</label>
                        <input type="radio" id="contactChoice2"
                               name="contact" value="phone"/>
                        <label className="ml-2 mr-4" htmlFor="contactChoice2">Телефон</label>
                        <input type="radio" id="contactChoice3"
                               name="contact" value="mail"/>
                        <label className="ml-2 mr-4" htmlFor="contactChoice3">Граммофон</label>
                    </div>
                </Panel>
                <Panel title="Панель с заголовком и бордюром (компонент Panel)">
                    <div className="bg-yellow-100 p-2" style={{ height: "33vh" }}>панели внутри это div class="panel"
                        <label htmlFor=''>панель 1</label>
                        <div className='panel'>Класс panel</div>
                        <label htmlFor='' className="mt-4">панель 2</label>
                        <div className='panel'>Класс panel</div>

                    </div>
                </Panel>
            </div>
            <Loading label={"Компонент Loading"}/>
        </div>
    )
}
