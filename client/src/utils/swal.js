import Swal from "sweetalert2";

// export const errorDisplay = (
//   error = ErrorMessages.generalMessage,
//   title = "Oops..."
// ) => {
//   Swal.fire({
//     background: BACKGROUND_COLOR,
//     color: TEXT_COLOR,
//     icon: "error",
//     title: title,
//     confirmButtonColor: BACKGROUND_COLOR,
//     text: titleCase(error),
//   });
// };

// export const successDisplay = (msg = "Success!", position = null) => {
//   let alertBody = {
//     icon: "success",
//     background: BACKGROUND_COLOR,
//     color: TEXT_COLOR,
//     title: "Success",
//     text: titleCase(msg),
//     showConfirmButton: false,
//     timer: MESSAGE_DISPLAY_TIME,
//   };

//   if (position) alertBody.position = position;

//   Swal.fire(alertBody);
// };

export const successToaster = (msg = "Success!") => {
  const Toast = Swal.mixin({
    toast: true,
    // background: BACKGROUND_COLOR,
    // color: TEXT_COLOR,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    text: msg,
  });
};

export const failureToaster = (msg = "Oops something went wrong!!") => {
  const Toast = Swal.mixin({
    toast: true,
    // background: ERROR_COLOR,
    // color: TEXT_COLOR,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,

    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "error",
    text: msg,
  });
};

// export const confirmationAlert = (onConfirmation, additionalMsg = "") => {
//   const alertConfig = {
//     title: "Are you sure?",
//     text: `You won't be able to revert this! ${additionalMsg}`,
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: CONFIRM_BUTTON_COLOR,
//     cancelButtonColor: CANCEL_BUTTON_COLOR,
//     confirmButtonText: CONFIRM_BUTTON_TEXT,
//   };

//   Swal.fire(alertConfig).then((result) => {
//     if (result.isConfirmed) {
//       onConfirmation();
//     }
//   });
// };
