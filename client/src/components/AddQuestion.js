const AddQuestion = ({ questionRef, questions, questionsSetter, currCategory }) => {
    // open or close modal
    const handleModal = () => {
        const overlay = document.querySelector('.questionOverlay');
        const modalBox = document.querySelector('.questionModalBox');

        overlay.classList.toggle('hidden');
        modalBox.classList.toggle('hidden');
        questionRef.current.value = '';
    };

    const addQuestion = () => {
        const input = {};
        input.question = questionRef.current.value;
        input.categoryId = currCategory;

        const url = 'http://localhost:5000/questions';
        const parameters = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        };

        fetch(url, parameters);
        questionsSetter([...questions, input]);
        handleModal();
    };

    return (
        <>
            <div onClick={handleModal}>+</div>
            <div className='questionOverlay hidden' onClick={handleModal}></div>
            <div className='questionModalBox hidden'>
                <div onClick={handleModal}>X</div>
                <div>Add new question</div>
                <input type='text' ref={questionRef} />
                <button onClick={addQuestion}>+</button>
            </div>
        </>
    );
};

export default AddQuestion;