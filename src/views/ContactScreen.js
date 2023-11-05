import { Container, Heading, Stack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import InlineError from "../components/ContactForm/InlineError";
import {
  validateEmail,
  validateMessage,
  validateName,
  validateSubject,
} from "../components/ContactForm/Validation";
import { sendEmailAction } from "../redux/actions/ContactMailAction";
import { useDispatch, useSelector } from "react-redux";
import { SEND_EMAIL_RESET } from "../redux/constants/MailConstants";
const ContactScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState();
  const [emailError, setEmailError] = useState();
  const [subjectError, setSubjectError] = useState();
  const [messageError, setMessageError] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const sendEmail = useSelector((state) => state.sendEmail);
  const { success } = sendEmail;

  useEffect(() => {
    // VALIDATION
    validateName({ name, setNameError });
    validateEmail({ email, setEmailError });
    validateSubject({ subject, setSubjectError });
    validateMessage({ message, setMessageError });

    if (success) {
      toast({
        title: "Gửi mail thành công ! .",
        description:
          "Cảm ơn đã gửi cho tôi thắc mắc của bạn. Xin hãy kiểm tra hộp thư - tôi sẽ liên hệ sóm thôi !",
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      dispatch({ type: SEND_EMAIL_RESET });
      setTimeout(() => {
        setButtonLoading(false);
      }, 1000);
    }
  }, [name, email, subject, message, toast, success, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    setButtonLoading(true);
    if (!nameError && !emailError && !subjectError && !messageError) {
      dispatch(sendEmailAction({ name, email, subject, message }));
    }
  };
  return (
    <div className="content">
      <Container maxW="container.sm">
        <div className="row align-items-center no-gutters contact-wrap">
          <div className="col-md-12">
            <Stack className="form h-100">
              <Heading as="h2" size="lg" h={70}>
                Contact me
              </Heading>
              <form
                className="mb-5"
                method="post"
                id="contact-form"
                name="contact-form"
                onSubmit={submitHandler}
              >
                <div className="row">
                  <div className="col-md-6 form-group mb-5">
                    <label htmlFor="name" className="col-form-label">
                      Họ Tên
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập tên"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    {nameError && <InlineError error={nameError} />}
                  </div>
                  <div className="col-md-6 form-group mb-5">
                    <label htmlFor="email" className="col-form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Nhập email.."
                    />
                    {emailError && <InlineError error={emailError} />}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 form-group mb-5">
                    <label htmlFor="subject" className="col-form-label">
                      Tiều đề
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Nhập tiêu đề "
                      required
                    />
                    {subjectError && <InlineError error={subjectError} />}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 form-group mb-5">
                    <label htmlFor="message" className="col-form-label">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      cols={55}
                      rows={4}
                      placeholder="Viết lời nhắn bạn muốn gửi"
                      required
                    />
                    {messageError && <InlineError error={messageError} />}
                  </div>
                </div>
                <div className="row">
                  <button
                    type="submit"
                    className="btn btn-dark"
                    disabled={buttonLoading && true}
                  >
                    {buttonLoading ? "Loading..." : "Gửi"}
                  </button>
                </div>
              </form>
            </Stack>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactScreen;
