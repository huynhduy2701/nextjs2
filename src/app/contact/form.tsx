import './style.scss'
const FormContact=()=>{
    return (
        <div className="form">
            <div className="containerContacts">
                <div className='form__wrap'>
                    <div className='form__formInput'>
                        <div className='form__nameGroup'>
                            <div className='form__firstName'>
                                <input type="text" placeholder='Nhập họ'/>
                            </div>
                            <div className='form__lastName'>
                                <input type="text" placeholder='Nhập tên'/>
                            </div>
                        </div>
                        <div className='form__email'>
                            <input type="text" placeholder='Nhập email'/>
                        </div>
                        <div className='form__message'>
                            <textarea placeholder='Nhập message'></textarea>
                        </div>
                        <div className='form__button'>
                            <div className='form__btn'>
                                <span>Send Message</span>
                            </div>
                        </div>
                    </div>
                    <div className='form_map'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d7839.8450210460705!2d106.7061008!3d10.740455599999999!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1714630765304!5m2!1svi!2s" width="600" height="450" style={{border:"0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FormContact