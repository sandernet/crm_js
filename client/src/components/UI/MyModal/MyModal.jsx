import React from 'react';
import cl from './MyModal.module.css';

const MyModal = ({children, visible, setVisible}) => {

    const rootClasses = [cl.myModal]

    if (visible) { 
        // показываем модальной окно
        rootClasses.push(cl.active);
    }

    return (
        // темная область 
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            {/* контейнер с формой */}
            <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;
