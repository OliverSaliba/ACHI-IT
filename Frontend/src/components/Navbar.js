import React from 'react';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Navbar = ({userLang , withBg}) => {
  const {t} = useTranslation();

 const handleScrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
  return (
    <>
    <div className={`hidden absolute z-[99] md:flex justify-between lg:justify-start items-center ${withBg ? 'bg-[#28509E] py-[20px] mb-[110px] md:mb-[70px] 2xl:mb-[70px] xl:mb-[70px] lg:mb-[40px] w-[100%]' : 'pt-[44px] mb-[110px] md:mb-[70px] 2xl:mb-[70px] xl:mb-[70px] lg:mb-[40px] lg:w-[100%]'}`}>
        <div className='block md:hidden ml-[20px] mr-[40px] 2xl:ml-[120px] xl:ml-[120px] lg:ml-[80px] md:ml-[60px] sm:ml-[60px] 2xl:mr-[70px] xl:mr-[70px] lg:mr-[70px] md:mr-[40px] sm:mr-[50px]'>
            <img src='/assets/ACHI (2) 2.png' alt='siteLogo'/>
        </div>
        <div className={`hidden md:block ${userLang === "en" ? 'ltr:mr-[40px] ltr:2xl:mr-[60px] ltr:xl:mr-[60px] ltr:lg:mr-[40px] ltr:md:mr-[20px] ltr:sm:mr-[40px]' : 'ltr:mr-[20px] ltr:2xl:mr-[30px] ltr:xl:mr-[30px] ltr:lg:mr-[20px] ltr:md:mr-[20px] ltr:sm:mr-[20px]'} rtl:ml-[0px] rtl:2xl:ml-[0px] rtl:xl:ml-[0px] rtl:lg:ml-[0px] rtl:md:ml-[0px] rtl:sm:ml-[0px] ltr:ml-[20px] ltr:2xl:ml-[120px] ltr:xl:ml-[120px] ltr:lg:ml-[80px] ltr:md:ml-[60px] ltr:sm:ml-[60px] rtl:mr-[20px] rtl:2xl:mr-[120px] rtl:xl:mr-[120px] rtl:lg:mr-[80px] rtl:md:mr-[60px] rtl:sm:mr-[60px]`}>
            <NavLink to={`/`} className={({ isActive }) => isActive ? 'font-[500] text-[15px] text-[#FA7800] hover:text-[#FA7800] 2xl:text-[20px] xl:text-[18px] lg:text-[18px] md:text-[18px] sm:text-[16px] transition duration-500 font-saira cursor-pointer' : 'font-[500] text-[15px] text-white hover:text-[#FA7800] 2xl:text-[20px] xl:text-[18px] lg:text-[18px] md:text-[18px] sm:text-[16px] transition duration-500 font-saira cursor-pointer'}>{t('nav.home')}</NavLink>            
        </div>
        <div className={`hidden md:block ${userLang === "en" ? 'mr-[40px] 2xl:mr-[60px] xl:mr-[60px] lg:mr-[40px] md:mr-[20px] sm:mr-[40px]' : 'mr-[20px] 2xl:mr-[30px] xl:mr-[30px] lg:mr-[20px] md:mr-[20px] sm:mr-[20px]'}`}>
            <p className={`font-[500] text-[15px] text-white hover:text-[#FA7800] cursor-pointer 2xl:text-[20px] xl:text-[18px] lg:text-[18px] md:text-[18px] sm:text-[16px] transition duration-500 font-saira`} onClick={() => handleScrollToElement("aboutUs")}>{t('nav.about')}</p>            
        </div>
        <div className={`hidden md:block ${userLang === "en" ? 'mr-[40px] 2xl:mr-[60px] xl:mr-[60px] lg:mr-[40px] md:mr-[20px] sm:mr-[40px]' : 'mr-[20px] 2xl:mr-[30px] xl:mr-[30px] lg:mr-[20px] md:mr-[20px] sm:mr-[20px]'}`}>
            <NavLink to={`/services`} className={({ isActive }) => isActive ? 'font-[500] text-[15px] text-[#FA7800] hover:text-[#FA7800] 2xl:text-[20px] xl:text-[18px] lg:text-[18px] md:text-[18px] sm:text-[16px] transition duration-500 font-saira cursor-pointer' : 'font-[500] text-[15px] text-white hover:text-[#FA7800] 2xl:text-[20px] xl:text-[18px] lg:text-[18px] md:text-[18px] sm:text-[16px] transition duration-500 font-saira cursor-pointer'}>{t('nav.services')}</NavLink>            
        </div>
        {/* <div className={`hidden md:block ${userLang === "en" ? 'mr-[40px] 2xl:mr-[60px] xl:mr-[60px] lg:mr-[40px] md:mr-[20px] sm:mr-[40px]' : 'mr-[20px] 2xl:mr-[30px] xl:mr-[30px] lg:mr-[20px] md:mr-[20px] sm:mr-[20px]'}`}>
            <NavLink to={`/marketplace`} className={({ isActive }) => isActive ? 'font-[500] text-[15px] text-[#FA7800] hover:text-[#FA7800] 2xl:text-[20px] xl:text-[18px] lg:text-[18px] md:text-[18px] sm:text-[16px] transition duration-500 font-saira cursor-pointer' : 'font-[500] text-[15px] text-white hover:text-[#FA7800] 2xl:text-[20px] xl:text-[18px] lg:text-[18px] md:text-[18px] sm:text-[16px] transition duration-500 font-saira cursor-pointer'}>{t('nav.marketplace')}</NavLink>            
        </div> */}
        <div className={`hidden md:block ${userLang === "en" ? 'mr-[40px] 2xl:mr-[60px] xl:mr-[60px] lg:mr-[40px] md:mr-[20px] sm:mr-[40px]' : 'mr-[20px] 2xl:mr-[30px] xl:mr-[30px] lg:mr-[20px] md:mr-[20px] sm:mr-[20px]'}`}>
            <p className={`font-[500] text-[15px] text-white hover:text-[#FA7800] cursor-pointer 2xl:text-[20px] xl:text-[18px] lg:text-[18px] md:text-[18px] sm:text-[16px] transition duration-500 font-saira`} onClick={() => handleScrollToElement("clients")}>{t('nav.clients')}</p>            
        </div>
        <div className={`hidden md:block ${userLang === "en" ? 'mr-[40px] 2xl:mr-[60px] xl:mr-[60px] lg:mr-[40px] md:mr-[20px] sm:mr-[40px]' : 'mr-[20px] 2xl:mr-[30px] xl:mr-[30px] lg:mr-[20px] md:mr-[20px] sm:mr-[20px]'}`}>
            <p className={`font-[500] text-[15px] text-white hover:text-[#FA7800] cursor-pointer 2xl:text-[20px] xl:text-[18px] lg:text-[18px] md:text-[18px] sm:text-[16px] transition duration-500 font-saira`} onClick={() => handleScrollToElement("service")}>{t('nav.projects')}</p>            
        </div>
        <div className={`hidden md:block ${userLang === "en" ? 'mr-[40px] 2xl:mr-[60px] xl:mr-[60px] lg:mr-[40px] md:mr-[20px] sm:mr-[40px]' : 'mr-[20px] 2xl:mr-[30px] xl:mr-[30px] lg:mr-[20px] md:mr-[20px] sm:mr-[20px]'}`}>
            <NavLink to={`/gallery`} className={({ isActive }) => isActive ? 'font-[500] text-[15px] text-[#FA7800] hover:text-[#FA7800] 2xl:text-[20px] xl:text-[18px] lg:text-[18px] md:text-[18px] sm:text-[16px] transition duration-500 font-saira cursor-pointer' : 'font-[500] text-[15px] text-white hover:text-[#FA7800] 2xl:text-[20px] xl:text-[18px] lg:text-[18px] md:text-[18px] sm:text-[16px] transition duration-500 font-saira cursor-pointer'}>{t('nav.gallery')}</NavLink>            
        </div>
        <div className={`hidden md:block ${userLang === "en" ? 'mr-[40px] 2xl:mr-[60px] xl:mr-[60px] lg:mr-[40px] md:mr-[20px] sm:mr-[40px]' : 'mr-[20px] 2xl:mr-[30px] xl:mr-[30px] lg:mr-[20px] md:mr-[20px] sm:mr-[20px]'}`}> 
            <p className={`font-[500] text-[15px] text-white hover:text-[#FA7800] cursor-pointer 2xl:text-[20px] xl:text-[18px] lg:text-[18px] md:text-[18px] sm:text-[16px] transition duration-500 font-saira`} onClick={() => handleScrollToElement("contactForm")}>{t('nav.contact')}</p>            
        </div>
    </div>
    </>
  )
}

export default Navbar