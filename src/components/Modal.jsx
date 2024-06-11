import React from 'react';
import { Card, Button } from 'antd';
import "./modal.css"
const Modal = (props) => {
    const { pokemonSelected, hanleCloseModal } = props


    return (
        <div className='modal-container'>



            <Card title={pokemonSelected.name} className='content' bordered={false}>
                <div className='poke_container'>
                    <img src={pokemonSelected.image} alt="" />
                    <p className="pokemon_id">{pokemonSelected.id}</p>
                    <div className="pokemon_class_wrapper">
                        {
                            pokemonSelected.types.map((type_, index) => {
                                return (
                                    <span className={type_} key={index}>{type_}</span>
                                )
                            })
                        }
                    </div>
                </div>

                <Button style={{ marginRight: "10px" }} type='primary'>Save</Button>
                <Button onClick={hanleCloseModal}>Cancel</Button>

            </Card>

        </div>

    )
};
export default Modal;