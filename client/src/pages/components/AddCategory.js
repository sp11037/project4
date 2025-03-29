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
        const newId = categories.length + 1;
        const newCategory = categoryRef.current.value;
        const input = {
            categoryId: newId,
            categoryName: newCategory
        }

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
            <div onClick={handleModal}>+</div>
            <div className='categoryOverlay hidden' onClick={handleModal}></div>
            <div className='categoryModalBox hidden'>
                <div onClick={handleModal}>X</div>
                <div>Add new category</div>
                <input type='text' ref={categoryRef} />
                <button onClick={addCategory}>+</button>
            </div>
        </>
    );
};

export default AddCategory;