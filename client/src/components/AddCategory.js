const AddCategory = ({ categoryRef, categories, categoriesSetter }) => {
    // open or close modal
    const handleModal = () => {
        const overlay = document.querySelector('.categoryOverlay');
        const modalBox = document.querySelector('.categoryModalBox');

        overlay.classList.toggle('hidden');
        modalBox.classList.toggle('hidden');
        categoryRef.current.value = '';
    };

    const addCategory = () => {
        const input = {};
        input.categoryId = categories.length + 1;
        input.categoryName = categoryRef.current.value;

        const url = 'http://localhost:5000/categories';
        const parameters = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        };

        fetch(url, parameters);
        categoriesSetter([...categories, input]);
        handleModal();
    };

    return (
        <>
            <div id='addCategoryBtn' onClick={handleModal}>+</div>
            <div className='categoryOverlay hidden' onClick={handleModal}></div>
            <div className='categoryModalBox hidden'>
                <div className='closeModalBtn' onClick={handleModal}>&#9932;</div>
                <div className='modalText'>Add new category</div>
                <textarea className='modalInput' type='text' ref={categoryRef} />
                <button className='modalAddBtn' onClick={addCategory}>+</button>
            </div>
        </>
    );
};

export default AddCategory;