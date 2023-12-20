import { Formik, Form, Field, ErrorMessage } from 'formik'

import React, { useState, useEffect, useRef } from 'react'

import classes from './NewSubscription.module.css'

import { useAppDispatch } from '../../hooks/useReduxHooks'
import { SubscriptionService } from '../../services/subscription/subscription.service'
import { TSubscriptionFormValues } from '../../types/subscription'
import { resizeImage } from '../../utils/resizeImage'
import {
  validationSubscriptionSchema,
  currenciesOptions,
  paymentFrequencyOptions,
} from '../../utils/validationSubscriptionSchema'
import { validTypes } from '../../utils/validTypesImages'
import { DatePick } from '../DatePicker/DatePicker'

import { NotificationAdd } from '../Notifications/NotificationAdd'
import { createSubscription } from '../store/subscriptions/subscriptionsActions'

export const NewSubscription = () => {
  const dispatch = useAppDispatch()
  const windowWidth = useRef(window.innerWidth)
  const uploadText = windowWidth.current < 568 ? 'Upload' : 'Click to Upload'

  const [disabledSubmit, setDisabledSubmit] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState('Choose an image')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [preview, setPreview] = useState('')
  const [subscriptionAdded, setSubscriptionAdded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!file) {
      return
    }
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
  }, [file])

  const handleChangeImage = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files !== null) {
      const image: File = await resizeImage(ev.target.files[0])
      setFile(image)
    }
  }
  const handleUploadImage = async () => {
    setDisabledSubmit(true)
    if (!file) {
      setDisabledSubmit(false)
      setImageUrl(null)
      setProgress('Image is missing')
      return
    }
    if (!validTypes.includes(file.type.split('/')[1])) {
      setDisabledSubmit(false)
      setProgress('Invalid format')
      setFile(null)
    }
    const formData = new FormData()

    formData.append('image', file)
    try {
      setFile(null)
      setImageUrl(null)
      setProgress('Uploading...')
      const image = await SubscriptionService.uploadImage(formData)

      setImageUrl(image.data.secure_url)
      setProgress('Uploaded image')
      setDisabledSubmit(false)
    } catch (err) {
      console.log(err)
      setDisabledSubmit(false)
    }
  }

  const handleSubmit = async (values: TSubscriptionFormValues, resetForm: () => void) => {
    if (values.year && values.month && values.day) {
      setLoading(true)
      setDisabledSubmit(true)
      const { name, price, currency, paymentFrequency, year, month, day, status } = values
      const newSubscription = {
        name,
        price: parseFloat(price),
        year,
        month,
        day,
        currency,
        paymentFrequency,
        image: imageUrl,
        status,
      }
      try {
        dispatch(createSubscription(newSubscription))
        setLoading(false)
        setSubscriptionAdded(true)
        setDisabledSubmit(false)
        setFile(null)
        setImageUrl(null)
        resetForm()
        setProgress('Choose an image')
      } catch (e) {
        setError(true)
        console.error('Error adding subscription: ', e)
      }
    }
  }

  const initialValues = {
    name: '',
    price: '',
    currency: '',
    paymentFrequency: '',
    year: null,
    month: null,
    day: null,
    status: true,
    image: null,
  }

  const renderError = (message: string) => <p className={classes.error}>{message}</p>
  const disabledInput = disabledSubmit ? classes.inActiveUpload : classes.activeUpload
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSubscriptionSchema}
      onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
    >
      {({ values, setFieldValue, resetForm }) => (
        <section className={classes.container}>
          <h2 className={classes.header}>New Subscription</h2>
          <Form className={classes.form}>
            <div className={classes.field}>
              <label htmlFor='name'>Name</label>
              <Field className={classes.input} type='text' name='name' id='name' placeholder='Spotify' />
              <ErrorMessage name='name' render={renderError} />
            </div>
            <div className={classes.field}>
              <label htmlFor='price'>Price</label>
              <Field className={classes.input} type='text' name='price' id='price' placeholder='200' />
              <ErrorMessage name='price' render={renderError} />
            </div>
            <div className={classes.field}>
              <label htmlFor='datePicker'>Next payment</label>
              <DatePick setFieldValue={setFieldValue} year={values.year} month={values.month} day={values.day} />
            </div>
            <div className={classes.field}>
              <label htmlFor='currency'>Currency</label>
              <Field className={classes.input} type='text' as='select' name='currency' id='currency'>
                <option value=''>Select currency</option>
                {currenciesOptions}
              </Field>

              <ErrorMessage name='currency' render={renderError} />
            </div>
            <div className={classes.field}>
              <label htmlFor='paymentFrequency'>Payment frequency</label>
              <Field className={classes.input} as='select' id='frequepaymentFrequencyncy' name='paymentFrequency'>
                <option value=''>Select frequency</option>
                {paymentFrequencyOptions}
              </Field>
              <ErrorMessage name='paymentFrequency' render={renderError} />
            </div>
            <div className={classes.upload}>
              <label className={disabledInput} htmlFor='file'>
                <input
                  type='file'
                  id='file'
                  accept='image/*'
                  className={classes.inputImage}
                  onChange={handleChangeImage}
                  name='file'
                  disabled={disabledSubmit}
                />
                <div className={classes.text}>
                  {(file?.name && (
                    <div className={classes.imageContainer}>
                      <div>Preview</div>
                      <img src={preview} className={classes.image} alt='preview' />
                    </div>
                  )) ??
                    ((imageUrl && (
                      <div className={classes.imageContainer}>
                        {progress} <img src={preview} className={classes.image} alt='preview' />
                      </div>
                    )) ||
                      (progress === 'Uploading...' ? (
                        <div className={classes.imageContainer}>
                          <div className={classes.loader} />
                        </div>
                      ) : (
                        progress
                      )))}
                </div>
              </label>
              <button
                type='button'
                onClick={handleUploadImage}
                className={classes.buttonUpload}
                disabled={disabledSubmit}
              >
                {uploadText}
              </button>
            </div>
            <button name='button' type='submit' className={classes.buttonSubmit} disabled={disabledSubmit}>
              {error
                ? 'Something went wrong, but we fix it'
                : (loading && (
                    <div className={classes.loaderContainer}>
                      Loading...
                      <div className={classes.loader} />
                    </div>
                  )) ||
                  'Add new subscription'}
            </button>
            <button
              type='button'
              className={classes.clearButton}
              onClick={() => {
                resetForm()
                setFile(null)
              }}
              disabled={disabledSubmit}
            >
              <span>Clear all fields</span>
            </button>
            <NotificationAdd subscriptionAdded={subscriptionAdded} setSubscriptionAdded={setSubscriptionAdded} />
          </Form>
        </section>
      )}
    </Formik>
  )
}
