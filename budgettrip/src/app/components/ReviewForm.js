"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./FormStyle.module.css";

export default function ReviewForm({ onReviewSubmit }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      rating: "5",
      comment: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, "Imię jest za krótkie")
        .required("To pole jest wymagane"),
      rating: Yup.number().required("Ocena jest wymagana"),
      comment: Yup.string()
        .min(10, "Opinia musi mieć minimum 10 znaków")
        .required("Treść opinii jest wymagana"),
    }),
    onSubmit: (values, { resetForm }) => {
      onReviewSubmit(values);
      resetForm();
    },
  });

  return (
    <div className={styles.reviewSection}>
      <h2>Podziel się opinią o planie</h2>

      <form onSubmit={formik.handleSubmit} className={styles.reviewForm}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Twoje imię</label>
          <input
            id="username"
            name="username"
            type="text"
            className={
              formik.touched.username && formik.errors.username
                ? styles.inputError
                : styles.input
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className={styles.errorMsg}>{formik.errors.username}</div>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="rating">Ocena</label>
          <select
            id="rating"
            name="rating"
            className={styles.select}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rating}
          >
            <option value="5">5 - Super</option>
            <option value="4">4 - Dobrze</option>
            <option value="3">3 - Średnio</option>
            <option value="2">2 - Słabo</option>
            <option value="1">1 - Tragicznie</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="comment">Treść opinii</label>
          <textarea
            id="comment"
            name="comment"
            rows="4"
            className={
              formik.touched.comment && formik.errors.comment
                ? styles.inputError
                : styles.textarea
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.comment}
          />
          {formik.touched.comment && formik.errors.comment ? (
            <div className={styles.errorMsg}>{formik.errors.comment}</div>
          ) : null}
        </div>

        <button type="submit" className={styles.submitReviewBtn}>
          Wyślij opinię
        </button>
      </form>
    </div>
  );
}
