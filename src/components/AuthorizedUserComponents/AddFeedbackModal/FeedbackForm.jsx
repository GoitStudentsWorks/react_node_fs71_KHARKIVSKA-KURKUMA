import { useFormik } from 'formik';
import * as yup from 'yup';
import { FaStar } from 'react-icons/fa';
import { BiPencil } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteReview,
  addReview,
  editReview,
} from 'store/feedback/feedbackThunks';
import ModalButton from 'components/GeneralComponents/ModalButton/ModalButton';
import { feedbackSelector } from 'store/selectors';

import {
  StarWrapper,
  NameLabel,
  InputStars,
  FeedbackWrapper,
  InputFeedback,
  ErrorsMessage,
  IconWrapper,
  CircleIcon,
  TitleWrapper,
  IconButton,
} from './FeedbackForm.styled';

const FeedbackForm = ({ toggleModal }) => {
  const data = useSelector(feedbackSelector);
  const reviews = data.feedback || [];

  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);

  /// Validate Feedback form with YUP ///
  const feedbackValidationSchema = yup.object().shape({
    rating: yup.number().min(1).max(5).required('Leave your rating'),
    text: yup
      .string()
      .trim()
      .notOneOf([' '])
      .max(300)
      .required('Leave your feedback'),
  });

  const initialValues = {
    rating: reviews.length > 0 ? reviews[0].rating : 5,
    text: reviews.length > 0 ? reviews[0].text : '',
  };

  /// Delete review function ///
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseYes = actions => {
    dispatch(deleteReview({ _id: reviews[0]._id }));
    toast.info('Review deleted');
    setOpen(false);
    toggleModal();
  };

  /// Formik function / main logic ///
  const formik = useFormik({
    initialValues,
    validationSchema: feedbackValidationSchema,

    onSubmit: async values => {
      try {
        if (isEditing && reviews.length > 0) {
          await dispatch(editReview({ ...values, _id: reviews[0]._id }));
          toast.success('Review updated successfully');
          // if (response.status >= 200 && response.status < 300) {
          //   toast.success('Review updated successfully');
          // }
          // else {
          //   toast.error('Oops, something went wrong...');
          // }
        } else {
          await dispatch(addReview(values));
          toast.success('Review created successfully');
          // if (response.status >= 200 && response.status < 300) {
          //   toast.success('Review created successfully');
          // }
          // else {
          //   toast.error('Oops, something went wrong...');
          // }
        }
        toggleModal();
      } catch (error) {
        toast.error('Oops, something went wrong...');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <StarWrapper>
        <NameLabel>Rating</NameLabel>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;

          return (
            <label key={i}>
              <InputStars
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => formik.setFieldValue('rating', ratingValue)}
                onChange={formik.handleChange}
                disabled={!isEditing && reviews.length > 0}
              />
              <FaStar
                size={24}
                color={
                  ratingValue <= formik.values.rating ? '#FFAC33' : '#CEC9C1'
                }
                style={{ marginRight: '2px' }}
              />
            </label>
          );
        })}
        {formik.errors.rating && formik.touched.rating && (
          <ErrorsMessage>Leave your rating</ErrorsMessage>
        )}
      </StarWrapper>
      <FeedbackWrapper>
        <TitleWrapper>
          <NameLabel>Review</NameLabel>
          {reviews && reviews.length > 0 && (
            <IconWrapper>
              <IconButton type="button" onClick={() => setIsEditing(true)}>
                <CircleIcon backgroundColor="#E3F3FF">
                  <BiPencil size={20} color={'#3E85F3'} />
                </CircleIcon>
              </IconButton>
              <IconButton type="button" onClick={handleClickOpen}>
                <CircleIcon backgroundColor="rgba(234, 61, 101, 0.2)">
                  <RiDeleteBinLine size={20} color={'#EA3D65'} />
                </CircleIcon>
              </IconButton>
            </IconWrapper>
          )}
        </TitleWrapper>

        <InputFeedback
          type="text"
          rows="7"
          name="text"
          value={formik.values.text}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter text"
          hasError={!!formik.errors.text && !!formik.touched.text}
          disabled={!isEditing && reviews.length > 0}
        />
        {formik.errors.text && formik.touched.text && (
          <ErrorsMessage>{formik.errors.text}</ErrorsMessage>
        )}
      </FeedbackWrapper>
      {(!reviews || reviews.length === 0) && (
        <div>
          <ModalButton
            type="submit"
            textColor="#FFFFFF"
            backgroundColor="#3E85F3"
          >
            <span>Save</span>
          </ModalButton>
          <ModalButton type="button" onClick={toggleModal}>
            Cancel
          </ModalButton>
        </div>
      )}
      {reviews && reviews.length > 0 && isEditing && (
        <div>
          <ModalButton
            type="submit"
            textColor="#FFFFFF"
            backgroundColor="#3E85F3"
          >
            <span>Edit</span>
          </ModalButton>
          <ModalButton type="button" onClick={toggleModal}>
            Cancel
          </ModalButton>
        </div>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete review?'}</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseYes}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default FeedbackForm;
