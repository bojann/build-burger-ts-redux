import React from "react";
import Modal from "../../component/shared/Modal/Modal";

interface Props {
    errorMsg: string | undefined,
    modalShow: boolean,
    handleModalClose: () => void,
}

const errorModal = (props: Props) => {
    const {
        errorMsg = "Ups, something went wrong with network",
        modalShow,
        handleModalClose,
    } = props;

    return(
        <Modal
            modalShow={modalShow}
            handleModalClose={handleModalClose}
        >
            { errorMsg }
        </Modal>
    )
};

export default errorModal;
