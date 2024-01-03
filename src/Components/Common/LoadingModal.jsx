import React, { useEffect } from "react";
import Swal from "sweetalert2";
import Loader from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const LoadingModal = ({ show }) => {
  useEffect(() => {
    let timerInterval;

    if (show) {
      Swal.fire({
        title: "Data sedang di proses!",
        html: "Modal akan tertutup ketika data terkirim",
        timerProgressBar: true,
        allowOutsideClick: false, // Prevent closing when clicking outside
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close();
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [show]);

  return null;
};

export default LoadingModal;
