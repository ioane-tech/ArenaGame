import React from 'react'
import champData from '../champData';
import { useLanguage } from '../(Context)/LanguageContext';
import { usePopup } from '../(Context)/DetailedPopupContext';

function DetailPopup() {
    const {language} =useLanguage()
    const {popupOpen, setPopupOpen, detailId, setDetailId} = usePopup()

    return (
        <div className="detailed_popup_bg" onClick={() => setPopupOpen(false)}>
        {
            champData &&
            champData.map((value, key) => {
            if (value.id === detailId) {
                return (
                <div className="detailed_popup_container" key={key}>
                    <img className="detailed_popup_img" src={value.img} alt="" />
                    <p className="detailed_popup_name">{value.name}</p>
                    
                    <div className='flex flex-row'>
                    <p className="text-red-500 mr-3">{value.hp} Hp</p>
                    <p className="text-yellow-500 mb-2">{value.damage} Dmg</p>
                    </div>

                    <p className='detailed_popup_description'>
                    {language === "geo"? value.description.geo :  value.description.eng}
                    </p>

                    <button className='detailed_popup_close' onClick={() => setPopupOpen(false)}>
                    {language === "geo"? "დახურვა": "Close"}
                    </button>

                </div>
                );
            }
            return null;
            })  
        }
        </div>
    )
}

export default DetailPopup