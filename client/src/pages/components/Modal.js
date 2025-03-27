const Modal = ({ modalInputRef, handleModal, handleAdd }) => {
    return (
        <>
            <div className='overlay hidden' onClick={handleModal}></div>
            <div className='modalBox hidden'>
                <div onClick={handleModal}>X</div>
                <div className='modalText'></div>
                <input type='text' ref={modalInputRef} />
                <button onClick={handleAdd}>+</button>
            </div>
        </>
    )
}

export default Modal;