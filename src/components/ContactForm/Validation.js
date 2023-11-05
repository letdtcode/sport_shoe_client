const validateEmail = ({ email, setEmailError }) => {
  const emailRegular =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email && !email.match(emailRegular)
    ? setEmailError("Email not valid")
    : setEmailError("");
};

const validateName = ({ name, setNameError }) => {
  return name && name.length < 5
    ? setNameError("Ký tự quá ngắn")
    : name && name.length > 50
    ? setNameError("Make it short and be meanful")
    : setNameError("");
};

const validateSubject = ({ subject, setSubjectError }) => {
  return subject && subject.length < 5
    ? setSubjectError("Tiêu đề quá ngắn")
    : subject && subject.length > 50
    ? setSubjectError("Make it short and be meanful")
    : setSubjectError("");
};

const validateMessage = ({ message, setMessageError }) => {
  return message && message.length < 5
    ? setMessageError("Ký tự quá ngắn")
    : message && message.length > 200
    ? setMessageError("Make it short and be meanful")
    : setMessageError("");
};

export { validateEmail, validateName, validateSubject, validateMessage };
