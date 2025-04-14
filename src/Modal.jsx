import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// we addded a div in index.html of class "modal"

// "children" here refers to elements that go inside Modal, which are passed as props:
//      <Modal>
//          <h1>...</h1>     <-- children
//      </Modal>
const Modal = ({ children }) => {
    // to grab ahold of the same div throughout re-renders, we use useRef
    const elRef = useRef(null);
    if(!elRef.current) {
        elRef.current = document.createElement("div");
    }

    useEffect(() => {
        const modalRoot = document.getElementById("modal");
        modalRoot.appendChild(elRef.current);

        // whatever function you return in useEffect gets run once when it(?) gets unmounted.
        // here, we use this for a cleanup function to solve a memory leak
        return () => modalRoot.removeChild(elRef.current);
    }, []);

    return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
