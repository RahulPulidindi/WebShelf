import React, { useState } from 'react';
import styled from 'styled-components';
import { Field, FieldAttributes, Form, Formik } from 'formik';
import BarLoader from 'react-spinners/BarLoader';

interface AnnotateParams {
  link: string;
}

const initialValues = {
  link: '',
};

const Button = styled.button`
  width: 30%;
`;

const LoaderContainer = styled.div`
  margin-top: 10px;
`;

const FieldWrapper = ({
  children,
  icon,
}: {
  children: FieldAttributes<any>;
  icon?: string;
}) => {
  if (!icon) return children;

  return (
    <div className="field">
      <p className="control has-icons-left has-icons-right">
        {children}
        <span className="icon is-small is-left">
          <i className={`fas ${icon}`}></i>
        </span>
      </p>
    </div>
  );
};

const CreateAnnotationModal: React.FC<any> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (values: AnnotateParams) => {
    console.log('populate metadata');
  };
  return (
    <>
      {props.show && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">
                Annotate an interesting link 😍
              </p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => props.setShow(false)}
              ></button>
            </header>
            <section className="modal-card-body">
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                  <FieldWrapper icon="fa-link">
                    <Field
                      name="link"
                      className="input"
                      type="link"
                      placeholder="https://hackmit.org/"
                    />
                  </FieldWrapper>
                  <Button
                    className="button is-primary is-light is-outlined"
                    onClick={() => setIsLoading(true)}
                    type="submit"
                  >
                    <span className="icon">
                      <i className="fas fa-file-import"></i>
                    </span>
                    <span>Fetch content</span>
                  </Button>
                </Form>
              </Formik>
              <LoaderContainer>
                <BarLoader width={180} color={'#00947e'} loading={isLoading} />
              </LoaderContainer>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button is-success"
                onClick={() => console.log('Call API')}
              >
                Annotate
              </button>
              <button className="button" onClick={() => props.setShow(false)}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAnnotationModal;
